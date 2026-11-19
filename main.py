from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="ANT · Anthropic IPO, charted & traded")

# --- Live price tracker: pre-IPO perps (Hyperliquid) vs. listed stock (Nasdaq: ANT) ---
IPO_PRICE = 83.0  # $83.00 final IPO price (priced Nov 18, 2026)
TARGET_IPO_VALUATION_T = 1.50  # $1.50 Trillion fully diluted at $83.00/sh
TARGET_SHARE_PRICE = IPO_PRICE
MIDPOINT_SHARE_PRICE = 74.0  # $74.00 midpoint of initial $70–$78 S-1/A range
LISTING_DATE = "2026-11-19"
SHARES_OUTSTANDING = 18_070_000_000  # ~18.07B fully-diluted shares ($83.00/sh = $1.50T FDV)
BASIC_SHARES_OUTSTANDING = 13_230_000_000  # ~13.23B post-IPO Class A + Class N shares
SERIES_H_VALUATION_T = 0.965  # $965B post-money valuation (Series H, May 2026)

PERP_COIN = "io:ANTH"
XYZ_PERP_COIN = "xyz:ANT"
STOCK_SYMBOL = "ANT"
HL_URL = "https://api.hyperliquid.xyz/info"
YF_URL = (
    "https://query1.finance.yahoo.com/v8/finance/chart/"
    "{symbol}?interval=1d&range=3mo"
)
NASDAQ_QUOTE_URL = "https://api.nasdaq.com/api/quote/{symbol}/info?assetclass=stocks"
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


def _fetch_stock() -> dict[str, float]:
    """Daily close of the listed Nasdaq stock ANT (empty until first trade executes)."""
    res = _http_json(YF_URL.format(symbol=STOCK_SYMBOL))
    out: dict[str, float] = {}
    try:
        r = res["chart"]["result"][0]
        meta = r.get("meta") or {}
        # Before the Nasdaq IPO Cross prints its first trade, Yahoo seeds the
        # $83.00 IPO offer price with firstTradeDate=None and volume=0.
        first_trade = meta.get("firstTradeDate")
        ts = r.get("timestamp") or []
        quote = (r.get("indicators", {}).get("quote") or [{}])[0]
        closes = quote.get("close") or []
        volumes = quote.get("volume") or []
        for idx, (t, c) in enumerate(zip(ts, closes)):
            if c is None:
                continue
            vol = volumes[idx] if idx < len(volumes) else None
            date = time.strftime("%Y-%m-%d", time.gmtime(t))
            if date < LISTING_DATE:
                continue
            # Skip pre-cross placeholder quotes where volume is 0 and firstTradeDate is None
            if first_trade is None and (vol is None or vol <= 0):
                continue
            out[date] = round(float(c), 2)
    except (KeyError, IndexError, TypeError):
        pass
    return out


def _parse_usd(raw: str | None) -> float | None:
    if not raw or not isinstance(raw, str):
        return None
    cleaned = raw.replace("$", "").replace(",", "").strip()
    try:
        return round(float(cleaned), 2)
    except ValueError:
        return None


def _fetch_nasdaq_quote() -> dict:
    """Fetch live Nasdaq quote & pre-open IPO Cross bid/ask for ANT."""
    try:
        res = _http_json(NASDAQ_QUOTE_URL.format(symbol=STOCK_SYMBOL))
        data = (res.get("data") or {}) if isinstance(res, dict) else {}
        prim = data.get("primaryData") or {}
        last_sale = _parse_usd(prim.get("lastSalePrice"))
        bid = _parse_usd(prim.get("bidPrice"))
        ask = _parse_usd(prim.get("askPrice"))
        return {
            "symbol": STOCK_SYMBOL,
            "exchange": data.get("exchange") or "NASDAQ-GS",
            "market_status": data.get("marketStatus") or "Open",
            "last_sale": last_sale,
            "bid": bid,
            "ask": ask,
            "volume": prim.get("volume") if prim.get("volume") != "N/A" else None,
            "is_trading": last_sale is not None,
        }
    except Exception:
        return {
            "symbol": STOCK_SYMBOL,
            "exchange": "NASDAQ-GS",
            "market_status": "Pre-Open IPO Cross",
            "last_sale": None,
            "bid": 100.0,
            "ask": 100.0,
            "volume": None,
            "is_trading": False,
        }


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
    stock_by_date: dict[str, float] = {}
    try:
        candles = _fetch_perp_candles(PERP_COIN, 180)
    except Exception:
        pass
    try:
        xyz_candles = _fetch_perp_candles(XYZ_PERP_COIN, 60)
    except Exception:
        pass
    try:
        stock_by_date = _fetch_stock()
    except Exception:
        pass
    nasdaq_q = _fetch_nasdaq_quote()

    # If Nasdaq live quote reports a real last_sale before Yahoo Finance's daily bar updates,
    # include today's date in stock_by_date.
    if nasdaq_q.get("last_sale") is not None:
        today = time.strftime("%Y-%m-%d", time.gmtime())
        if today >= LISTING_DATE and today not in stock_by_date:
            stock_by_date[today] = float(nasdaq_q["last_sale"])

    fd_shares_b = SHARES_OUTSTANDING / 1e9  # 18.07B
    basic_shares_b = BASIC_SHARES_OUTSTANDING / 1e9  # 13.23B

    xyz_by_date = {c["date"]: c["perp"] for c in xyz_candles}
    candle_by_date = {c["date"]: c for c in candles}
    all_dates = sorted(set(candle_by_date) | set(xyz_by_date) | set(stock_by_date))

    series: list[dict] = []
    for d in all_dates:
        c = candle_by_date.get(d)
        perp_val = c["perp"] if c else None
        perp_sh = round(perp_val / fd_shares_b, 2) if perp_val is not None else None
        xyz_sh = xyz_by_date.get(d)
        st_sh = stock_by_date.get(d)
        st_val = round(st_sh * fd_shares_b, 2) if st_sh is not None else None
        series.append(
            {
                "date": d,
                "perp": perp_val,
                "perp_share": perp_sh,
                "xyz": xyz_sh,
                "stock": st_sh,
                "stock_val": st_val,
                "open": c["open"] if c else None,
                "high": c["high"] if c else None,
                "low": c["low"] if c else None,
                "volume": c["volume"] if c else 0.0,
            }
        )

    latest_close = candles[-1]["perp"] if candles else 1830.50
    prev_close = candles[-2]["perp"] if len(candles) > 1 else latest_close
    day_change_pct = round(((latest_close - prev_close) / prev_close) * 100, 2) if prev_close else 0.0
    implied_valuation_t = round(latest_close / 1000.0, 3)
    implied_share_price_fd = round(latest_close / fd_shares_b, 2)

    xyz_close = xyz_candles[-1]["perp"] if xyz_candles else 104.13
    xyz_prev = xyz_candles[-2]["perp"] if len(xyz_candles) > 1 else xyz_close
    xyz_change_pct = round(((xyz_close - xyz_prev) / xyz_prev) * 100, 2) if xyz_prev else 0.0
    xyz_fdv_t = round((xyz_close * fd_shares_b) / 1000.0, 3)
    xyz_basic_cap_t = round((xyz_close * basic_shares_b) / 1000.0, 3)

    stock_vals = [pt["stock"] for pt in series if pt["stock"] is not None]
    stock_last = stock_vals[-1] if stock_vals else None
    stock_prev = stock_vals[-2] if len(stock_vals) > 1 else None

    return {
        "coin": PERP_COIN,
        "ipo_price": IPO_PRICE,
        "listing_date": LISTING_DATE,
        "source": "Hyperliquid Pre-IPO Perps (io:ANTH & xyz:ANT) + Nasdaq: ANT",
        "perp_source": "Hyperliquid · io:ANTH & xyz:ANT",
        "stock_source": "Nasdaq · ANT (via Yahoo Finance & Nasdaq Live)",
        "target_valuation_t": TARGET_IPO_VALUATION_T,
        "target_share_price": TARGET_SHARE_PRICE,
        "midpoint_share_price": MIDPOINT_SHARE_PRICE,
        "series_h_valuation_t": SERIES_H_VALUATION_T,
        "shares_outstanding": SHARES_OUTSTANDING,
        "basic_shares_outstanding": BASIC_SHARES_OUTSTANDING,
        "series": series,
        "latest": {
            "price": latest_close,
            "prev_close": prev_close,
            "day_change_pct": day_change_pct,
            "implied_valuation_t": implied_valuation_t,
            "implied_share_price_fd": implied_share_price_fd,
            "vs_series_h_pct": round(((implied_valuation_t - SERIES_H_VALUATION_T) / SERIES_H_VALUATION_T) * 100, 1),
            "vs_target_pct": round(((implied_valuation_t - TARGET_IPO_VALUATION_T) / TARGET_IPO_VALUATION_T) * 100, 1),
            "vs_s1a_mid_pct": round(((implied_share_price_fd - MIDPOINT_SHARE_PRICE) / MIDPOINT_SHARE_PRICE) * 100, 1),
            "stock": stock_last,
            "stock_prev": stock_prev,
        },
        "nasdaq_quote": nasdaq_q,
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
                    "best_bid": 1830.4,
                    "best_ask": 1830.6,
                    "mid": 1830.5,
                    "spread": 0.2,
                    "bids": [],
                    "asks": [],
                    "updated": int(now),
                }
    return JSONResponse(_orderbook_cache["data"])


# --- SEC filings feed: live EDGAR submissions for Anthropic, PBC (CIK 0002130357) ---
SEC_CIK = "0002130357"
SEC_SUBMISSIONS_URL = f"https://data.sec.gov/submissions/CIK{SEC_CIK}.json"
SEC_UA = "anthropic.algoentropy.com filings tracker (cliff.xuan@gresearch.co.uk)"
FILINGS_TTL = 600.0  # seconds
FILINGS_LIMIT = 14

_filings_cache: dict[str, object] = {"ts": 0.0, "data": None}

_FORM_DESCRIPTIONS: dict[str, tuple[str, str]] = {
    "424B4": (
        "Final IPO Prospectus (Rule 424(b)(4)): 980M Class A shares priced at $83.00/sh ($81.34B IPO + $26B Class N private placement).",
        "Final Pricing · $83.00/sh",
    ),
    "S-1MEF": (
        "Rule 462(b) Upsizing Registration Statement increasing offering size to 980M Class A shares ($83.00/sh).",
        "Effective · Upsized Offering",
    ),
    "EFFECT": (
        "SEC Notice of Effectiveness declaring Anthropic PBC's Form S-1 Registration Statement effective.",
        "Declared Effective",
    ),
    "CERT": (
        "Nasdaq Global Select Market Exchange Certification approving Class A Common Stock listing under ticker ANT.",
        "Nasdaq Certified",
    ),
    "8-A12B": (
        "Registration of Class A Common Stock under Section 12(b) of the Securities Exchange Act for Nasdaq listing.",
        "Effective",
    ),
    "S-8": (
        "Registration Statement for Anthropic PBC Employee Equity Incentive Plans and RSU/Option issuances.",
        "Effective",
    ),
    "FWP": (
        "Free Writing Prospectus — IPO roadshow presentation, final pricing term sheet, and international wraps.",
        "Filed with SEC",
    ),
    "3": (
        "Initial Statement of Beneficial Ownership of Securities (Insider Form 3 — Officer/Director/10% Owner).",
        "Insider Disclosure",
    ),
    "S-1/A": (
        "Pre-Effective Amendment to Form S-1 Registration Statement (roadshow terms, $26B Class N agreements, and exhibits).",
        "Amended Registration",
    ),
    "S-1": (
        "Initial Public Form S-1 Registration Statement ($4.59B FY25 revenue, $16.29B H1 2026 revenue, Class A/F/T/N governance).",
        "Public S-1",
    ),
    "DRS/A": (
        "Amended Confidential Draft Registration Statement submitted under JOBS Act review.",
        "Unsealed on EDGAR",
    ),
    "DRS": (
        "Initial Confidential Draft Registration Statement submitted June 1, 2026 under Section 6(e) of the JOBS Act.",
        "Unsealed on EDGAR",
    ),
}


def _fetch_filings() -> dict:
    raw = _http_json(SEC_SUBMISSIONS_URL, user_agent=SEC_UA)
    recent = raw["filings"]["recent"]
    n = len(recent["form"])
    descriptions = recent.get("primaryDocDescription") or [""] * n
    filings = []
    seen_form_dates: set[tuple[str, str]] = set()
    for i in range(n):
        form = recent["form"][i]
        filed = recent["filingDate"][i]
        doc = recent["primaryDocument"][i]
        # Collapse duplicate Form 3s or FWPs filed on the same date so the feed shows rich variety
        if form in ("3", "FWP") and (form, filed) in seen_form_dates:
            continue
        seen_form_dates.add((form, filed))

        accession = recent["accessionNumber"][i].replace("-", "")
        url = f"https://www.sec.gov/Archives/edgar/data/{int(SEC_CIK)}/{accession}/{doc}"
        raw_desc = descriptions[i] if i < len(descriptions) else ""
        fallback_desc, status = _FORM_DESCRIPTIONS.get(
            form,
            (raw_desc or f"SEC Form {form} filing ({doc})", "EDGAR Public"),
        )
        # If EDGAR's raw description is empty or just repeats the form code, use our detailed description
        desc = fallback_desc if (not raw_desc or raw_desc.strip() == form) else f"{raw_desc} — {fallback_desc}"
        filings.append(
            {
                "form": form,
                "filed": filed,
                "description": desc,
                "status": status,
                "public_expected": "EDGAR Public",
                "url": url,
            }
        )
        if len(filings) >= FILINGS_LIMIT:
            break

    return {
        "company": raw.get("name", "Anthropic, PBC"),
        "cik": SEC_CIK,
        "source": "SEC EDGAR Live Feed",
        "filings": filings,
        "updated": int(time.time()),
    }


@app.get("/api/filings")
def filings() -> JSONResponse:
    now = time.time()
    if _filings_cache["data"] is None or now - float(_filings_cache["ts"]) > FILINGS_TTL:
        try:
            _filings_cache["data"] = _fetch_filings()
            _filings_cache["ts"] = now
        except Exception:
            _filings_cache["ts"] = now - FILINGS_TTL + 60.0
            if _filings_cache["data"] is None:
                _filings_cache["data"] = {
                    "company": "Anthropic, PBC",
                    "cik": SEC_CIK,
                    "source": "SEC EDGAR",
                    "filings": [],
                    "updated": 0,
                }
    return JSONResponse(_filings_cache["data"])


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok", "app": "anthropic-chart"}


DIST = Path(__file__).parent / "frontend" / "dist"
if DIST.is_dir():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="spa")
