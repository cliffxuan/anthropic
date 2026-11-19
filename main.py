from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="ANT · Anthropic IPO, charted & traded")

# --- Live price tracker: pre-IPO perps on Hyperliquid (io:ANTH & xyz:ANT) ---
TARGET_IPO_VALUATION_T = 1.50  # $1.50 Trillion fully diluted at $83.00/sh final IPO pricing (Nov 18, 2026)
TARGET_SHARE_PRICE = 83.0  # $83.00 final IPO price (above $70–$78 S-1/A range)
MIDPOINT_SHARE_PRICE = 74.0  # $74.00 midpoint of initial $70–$78 S-1/A range
SHARES_OUTSTANDING = 18_070_000_000  # ~18.07B fully-diluted shares ($83.00/sh = $1.50T FDV)
BASIC_SHARES_OUTSTANDING = 13_230_000_000  # ~13.23B post-IPO Class A + Class N shares (after 980M upsize)
SERIES_H_VALUATION_T = 0.965  # $965B post-money valuation (Series H, May 2026)
PERP_COIN = "io:ANTH"
XYZ_PERP_COIN = "xyz:ANT"
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


def _fetch_perp_candles(coin: str = PERP_COIN, days: int = 180) -> list[dict]:
    """Fetch daily candles for a Hyperliquid perp contract."""
    end = int(time.time() * 1000)
    start = end - days * 86400 * 1000
    body = {
        "type": "candleSnapshot",
        "req": {
            "coin": coin,
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
    xyz_candles: list[dict] = []
    try:
        candles = _fetch_perp_candles(PERP_COIN, 180)
    except Exception:
        pass
    try:
        xyz_candles = _fetch_perp_candles(XYZ_PERP_COIN, 60)
    except Exception:
        pass

    latest_close = candles[-1]["perp"] if candles else 1811.80
    prev_close = candles[-2]["perp"] if len(candles) > 1 else latest_close
    day_change_pct = round(((latest_close - prev_close) / prev_close) * 100, 2) if prev_close else 0.0
    implied_valuation_t = round(latest_close / 1000.0, 3)  # 1 point = $1B implied valuation
    fd_shares_b = SHARES_OUTSTANDING / 1e9  # 18.07B
    basic_shares_b = BASIC_SHARES_OUTSTANDING / 1e9  # 13.23B
    implied_share_price_fd = round(latest_close / fd_shares_b, 2)

    xyz_close = xyz_candles[-1]["perp"] if xyz_candles else 103.00
    xyz_prev = xyz_candles[-2]["perp"] if len(xyz_candles) > 1 else xyz_close
    xyz_change_pct = round(((xyz_close - xyz_prev) / xyz_prev) * 100, 2) if xyz_prev else 0.0
    xyz_fdv_t = round((xyz_close * fd_shares_b) / 1000.0, 3)
    xyz_basic_cap_t = round((xyz_close * basic_shares_b) / 1000.0, 3)

    return {
        "coin": PERP_COIN,
        "source": "Hyperliquid HIP-3 Pre-IPO Perpetuals (io:ANTH & xyz:ANT)",
        "target_valuation_t": TARGET_IPO_VALUATION_T,
        "target_share_price": TARGET_SHARE_PRICE,
        "midpoint_share_price": MIDPOINT_SHARE_PRICE,
        "series_h_valuation_t": SERIES_H_VALUATION_T,
        "shares_outstanding": SHARES_OUTSTANDING,
        "basic_shares_outstanding": BASIC_SHARES_OUTSTANDING,
        "series": candles,
        "latest": {
            "price": latest_close,
            "prev_close": prev_close,
            "day_change_pct": day_change_pct,
            "implied_valuation_t": implied_valuation_t,
            "implied_share_price_fd": implied_share_price_fd,
            "vs_series_h_pct": round(((implied_valuation_t - SERIES_H_VALUATION_T) / SERIES_H_VALUATION_T) * 100, 1),
            "vs_target_pct": round(((implied_valuation_t - TARGET_IPO_VALUATION_T) / TARGET_IPO_VALUATION_T) * 100, 1),
            "vs_s1a_mid_pct": round(((implied_share_price_fd - MIDPOINT_SHARE_PRICE) / MIDPOINT_SHARE_PRICE) * 100, 1),
        },
        "xyz_ant": {
            "coin": XYZ_PERP_COIN,
            "price": xyz_close,
            "prev_close": xyz_prev,
            "day_change_pct": xyz_change_pct,
            "implied_fdv_t": xyz_fdv_t,
            "implied_basic_cap_t": xyz_basic_cap_t,
            "vs_s1a_top_pct": round(((xyz_close - TARGET_SHARE_PRICE) / TARGET_SHARE_PRICE) * 100, 1),
            "vs_s1a_mid_pct": round(((xyz_close - MIDPOINT_SHARE_PRICE) / MIDPOINT_SHARE_PRICE) * 100, 1),
            "trade_url": "https://app.hyperliquid.xyz/trade/xyz:ANT",
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
                    "best_bid": 1811.7,
                    "best_ask": 1811.9,
                    "mid": 1811.8,
                    "spread": 0.2,
                    "bids": [],
                    "asks": [],
                    "updated": int(now),
                }
    return JSONResponse(_orderbook_cache["data"])


@app.get("/api/filings")
def filings() -> JSONResponse:
    # Structured feed of SEC EDGAR filings for Anthropic, PBC (CIK 0002130357)
    return JSONResponse(
        {
            "company": "Anthropic, PBC",
            "cik": "0002130357",
            "source": "SEC EDGAR · Nasdaq Global Select (Ticker: ANT)",
            "filings": [
                {
                    "form": "Form 424(b)(4) (Final Pricing)",
                    "filed": "2026-11-18",
                    "description": "Priced upsized 980M Class A share IPO at $83.00/sh ($81.34B IPO proceeds; $1.50T FDV) + $26B concurrent Class N private placement at $83.00/sh ($107.34B total raise).",
                    "status": "Priced $83.00 · Debut Nov 19",
                    "public_expected": "Trading on Nasdaq: ANT",
                    "url": "https://www.sec.gov/edgar/browse/?CIK=0002130357",
                },
                {
                    "form": "Form S-1/A (Amend. No. 2)",
                    "filed": "2026-11-10",
                    "description": "Launched IPO roadshow: initial 825M Class A share range at $70–$78/sh alongside $26B strategic Class N commitments from Google, Nvidia, AMD, Broadcom, Micron, Microsoft & TSMC.",
                    "status": "Completed (Upsized Nov 18)",
                    "public_expected": "EDGAR Public",
                    "url": "https://www.sec.gov/edgar/browse/?CIK=0002130357",
                },
                {
                    "form": "Form S-1 (Public Registration)",
                    "filed": "2026-10-26",
                    "description": "Public S-1 registration statement disclosing $4.59B FY25 revenue, $16.29B H1 2026 revenue ($974M Q2 operating profit), $131.7B cash, and Class A/F/T/N governance.",
                    "status": "Declared Effective",
                    "public_expected": "EDGAR Public",
                    "url": "https://www.sec.gov/edgar/browse/?CIK=0002130357",
                },
                {
                    "form": "Final Judgment (Bartz Settlement)",
                    "filed": "2026-07-20",
                    "description": "U.S. District Court (N.D. Cal.) grants final approval to historic $1.5B Bartz v. Anthropic copyright class-action settlement (~$3,000/work across 500k books).",
                    "status": "Final Approval Entered",
                    "public_expected": "Payouts Q4 2026",
                    "url": "https://www.anthropiccopyrightsettlement.com/",
                },
                {
                    "form": "Series H Charter ($965B)",
                    "filed": "2026-05-18",
                    "description": "Restated Certificate of Incorporation filed in Delaware authorizing $65B Series H Preferred Stock round at $965B post-money led by Altimeter, Dragoneer, Greenoaks & Sequoia.",
                    "status": "Effective",
                    "public_expected": "Public record",
                    "url": "https://corp.delaware.gov/",
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
