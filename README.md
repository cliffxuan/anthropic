# ANT — The Anthropic IPO, charted & traded

Primary-source breakdown of Anthropic, PBC's Form 424(b)(4) final prospectus (CIK `0002130357`, Reg. Nos. `333-299633` & `333-300148`, priced November 18, 2026 at $83.00/share and listed November 19, 2026 on the Nasdaq Global Select Market under ticker **ANT**), visualised with live Nasdaq `ANT` + Hyperliquid perpetual (`xyz:ANT` & `io:ANTH`) tracking, the 9-tranche lock-up schedule, and an interactive post-IPO valuation & trading workbench. Deployed at https://anthropic.algoentropy.com/.

## Structure

- `frontend/` — Vite + React 19 + TS + Tailwind v4 + Recharts
- `main.py` — FastAPI shell that serves the built SPA, live Nasdaq `ANT` candles (Yahoo Finance) merged with Hyperliquid `xyz:ANT` ($/share) & `io:ANTH` ($B valuation) perpetuals, L2 orderbook, and live SEC EDGAR filings
- `Dockerfile` — multi-stage (node 24 build → python 3.14 serve)
- `data/prospectus.json` — canonical extracted Form 424(b)(4) and FWP dataset, mirrored into `frontend/src/`

## Features

- **Live Nasdaq `ANT` vs. Hyperliquid Perp Tracker**: Real-time Nasdaq `ANT` daily OHLCV candles (Day 1 open $111.50, high $115.10, close $97.17) compared against Hyperliquid `xyz:ANT` ($/sh) and `io:ANTH` ($B valuation index), with interactive share price ($/sh) and valuation ($B) chart views plus an interactive Perp ↔ Share converter.
- **Post-IPO Trade & Valuation Workbench**: Per-share trade simulator (`xyz:ANT` / `ANT`), valuation multiples sensitivity model calibrated to the $81B October 2026 annualized run-rate and 18.14B fully diluted share count, and live `xyz:ANT` L2 orderbook.
- **9-Tranche Lock-up & Live SEC EDGAR Feed**: Complete 9-window staged lock-up release schedule (~15.5B shares locked; next release Dec 15, 2026 for up to 303M shares), Public Benefit Fund $124.50/sh (+50%) trigger, and live SEC EDGAR submissions feed for CIK `0002130357`.
- **Form 424(b)(4) Offering & Financial Breakdown**: $81.34B IPO (980M Class A shares at $83.00/sh) + $26.0B Class N concurrent private placement ($104.8B combined net proceeds, $232.35B pro forma cash), $33.24B 9M 2026 revenue (+$4.08B Adjusted Operating Income, +$6.57B operating cash flow), and $900.9B in multi-cloud compute commitments.

## Local dev

```bash
# Install dependencies
just install

# Run frontend + backend together
just dev
```

## Deploy

```bash
just deploy
```

Dokploy app `anthropic-chart` on host `ct` (dokploy.algoentropy.com), served at https://anthropic.algoentropy.com.
