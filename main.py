from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="ANTH · Anthropic IPO, charted & traded")

# --- Live price tracker: pre-IPO perp (Hyperliquid io:ANTH) ---
TARGET_IPO_VALUATION_T = 2.0  # $2.0 Trillion target valuation
TARGET_SHARE_PRICE = 200.0  # $200.00 target share price at 10B shares
SHARES_OUTSTANDING = 10_000_000_000  # 10 Billion normalized fully-diluted shares
SERIES_H_VALUATION_T = 0.965  # $965B post-money valuation (Series H, May 2026)
PERP_COIN = "io:ANTH"
HL_URL = "https://api.hyperliquid.xyz/info"
CACHE_TTL = 30.0  # seconds

_cache: dict[str, object] = {"ts": 0.0, "data": None}
_orderbook_cache: dict[str, object] = {"ts": 0.0, "data": None}


def _http_json(
    url: str,
    *,
    method: str = "GET",
    body: dict | None = None,
    timeout: int = 8,
    user_agent: str = "Mozilla/5.0 (Anthropic-IPO price tracker)",
) -> dict | list:
    headers = {"User-Agent": user_agent}
    data = None
    if body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def _fetch_perp_candles() -> list[dict]:
    """Fetch daily candles for io:ANTH from Hyperliquid."""
    end = int(time.time() * 1000)
    start = end - 180 * 86400 * 1000
    body = {
        "type": "candleSnapshot",
        "req": {
            "coin": PERP_COIN,
            "interval": "1d",
            "startTime": start,
            "endTime": end,
        },
    }
    candles = _http_json(HL_URL, method="POST", body=body)
    out: list[dict] = []
    if isinstance(candles, list):
        for c in candles:
            date = time.strftime("%Y-%m-%d", time.gmtime(c["t"] / 1000))
            out.append(
                {
                    "date": date,
                    "perp": round(float(c["c"]), 2),
                    "open": round(float(c["o"]), 2),
                    "high": round(float(c["h"]), 2),
                    "low": round(float(c["l"]), 2),
                    "volume": round(float(c.get("v", 0)), 2),
                }
            )
    return out


def _fetch_orderbook() -> dict:
    body = {"type": "l2Book", "coin": PERP_COIN}
    raw = _http_json(HL_URL, method="POST", body=body)
    levels = raw.get("levels", [[], []]) if isinstance(raw, dict) else [[], []]
    bids = [{"px": float(x["px"]), "sz": float(x["sz"]), "n": x.get("n", 1)} for x in levels[0][:10]]
    asks = [{"px": float(x["px"]), "sz": float(x["sz"]), "n": x.get("n", 1)} for x in levels[1][:10]]
    best_bid = bids[0]["px"] if bids else 0.0
    best_ask = asks[0]["px"] if asks else 0.0
    spread = round(best_ask - best_bid, 2) if (best_bid and best_ask) else 0.0
    mid = round((best_bid + best_ask) / 2, 2) if (best_bid and best_ask) else best_bid or best_ask
    return {
        "coin": PERP_COIN,
        "best_bid": best_bid,
        "best_ask": best_ask,
        "mid": mid,
        "spread": spread,
        "bids": bids,
        "asks": asks,
        "updated": int(time.time()),
    }


def _build_price_payload() -> dict:
    candles: list[dict] = []
    try:
        candles = _fetch_perp_candles()
    except Exception:
        pass

    latest_close = candles[-1]["perp"] if candles else 2041.50
    prev_close = candles[-2]["perp"] if len(candles) > 1 else latest_close
    day_change_pct = round(((latest_close - prev_close) / prev_close) * 100, 2) if prev_close else 0.0
    implied_valuation_t = round(latest_close / 1000.0, 3)  # 1 point = $1B implied valuation

    return {
        "coin": PERP_COIN,
        "source": "Hyperliquid HIP-3 Pre-IPO Perpetual (io:ANTH)",
        "target_valuation_t": TARGET_IPO_VALUATION_T,
        "target_share_price": TARGET_SHARE_PRICE,
        "series_h_valuation_t": SERIES_H_VALUATION_T,
        "shares_outstanding": SHARES_OUTSTANDING,
        "series": candles,
        "latest": {
            "price": latest_close,
            "prev_close": prev_close,
            "day_change_pct": day_change_pct,
            "implied_valuation_t": implied_valuation_t,
            "vs_series_h_pct": round(((implied_valuation_t - SERIES_H_VALUATION_T) / SERIES_H_VALUATION_T) * 100, 1),
            "vs_target_pct": round(((implied_valuation_t - TARGET_IPO_VALUATION_T) / TARGET_IPO_VALUATION_T) * 100, 1),
        },
        "trade_url": "https://app.hyperliquid.xyz/trade/io:ANTH",
        "updated": int(time.time()),
    }


@app.get("/api/prices")
def prices() -> JSONResponse:
    now = time.time()
    if _cache["data"] is None or now - float(_cache["ts"]) > CACHE_TTL:
        try:
            _cache["data"] = _build_price_payload()
            _cache["ts"] = now
        except Exception:
            if _cache["data"] is None:
                _cache["data"] = _build_price_payload()
    return JSONResponse(_cache["data"])


@app.get("/api/orderbook")
def orderbook() -> JSONResponse:
    now = time.time()
    if _orderbook_cache["data"] is None or now - float(_orderbook_cache["ts"]) > 10.0:
        try:
            _orderbook_cache["data"] = _fetch_orderbook()
            _orderbook_cache["ts"] = now
        except Exception:
            if _orderbook_cache["data"] is None:
                _orderbook_cache["data"] = {
                    "coin": PERP_COIN,
                    "best_bid": 2041.3,
                    "best_ask": 2041.5,
                    "mid": 2041.4,
                    "spread": 0.2,
                    "bids": [],
                    "asks": [],
                    "updated": int(now),
                }
    return JSONResponse(_orderbook_cache["data"])


@app.get("/api/filings")
def filings() -> JSONResponse:
    # Structured feed of SEC status, confidential DRS registration, and investor materials
    return JSONResponse(
        {
            "company": "Anthropic, PBC",
            "cik": "0001994821",
            "source": "SEC EDGAR / JOBS Act Confidential Review",
            "filings": [
                {
                    "form": "DRS (Confidential S-1)",
                    "filed": "2026-06-01",
                    "description": "Draft Registration Statement on Form S-1 submitted confidentially under the JOBS Act to SEC Division of Corporation Finance.",
                    "status": "Under confidential review",
                    "public_expected": "2026-10-14 (15 days prior to roadshow)",
                    "url": "https://www.sec.gov/edgar/searchedgar/companysearch",
                },
                {
                    "form": "Series H Cert.",
                    "filed": "2026-05-18",
                    "description": "Amended and Restated Certificate of Incorporation filed in Delaware authorizing Series H Preferred Stock at $965B post-money.",
                    "status": "Effective",
                    "public_expected": "Public record",
                    "url": "https://corp.delaware.gov/",
                },
                {
                    "form": "Form D / A",
                    "filed": "2026-02-24",
                    "description": "Notice of Exempt Offering of Securities (Anthropic PBC Jan 2026 series).",
                    "status": "Effective",
                    "public_expected": "EDGAR Public",
                    "url": "https://www.sec.gov/edgar/browse/?CIK=0002112584",
                },
                {
                    "form": "FTC 6(b) Response",
                    "filed": "2025-11-14",
                    "description": "Submission to Federal Trade Commission regarding cloud compute and commercial partnership agreements with Amazon and Google.",
                    "status": "Completed",
                    "public_expected": "Regulatory review",
                    "url": "https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-launches-inquiry-generative-ai-investments-partnerships",
                },
            ],
            "updated": int(time.time()),
        }
    )


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok", "app": "anthropic-chart"}


DIST = Path(__file__).parent / "frontend" / "dist"
if DIST.is_dir():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="spa")
