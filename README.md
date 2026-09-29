# ANTH — The Anthropic IPO, charted & traded

Primary-source breakdown of the Anthropic PBC Form S-1 registration statement (confidentially submitted June 1, 2026), visualised with interactive IPO trading models and live Hyperliquid pre-IPO perpetual tracking. Deployed at https://anthropic.algoentropy.com/.

## Structure

- `frontend/` — Vite + React 19 + TS + Tailwind v4 + Recharts
- `main.py` — FastAPI shell that serves the built SPA, live `io:ANTH` Hyperliquid candles, L2 orderbook, and SEC filings
- `Dockerfile` — multi-stage (node 24 build → python 3.14 serve)
- `data/prospectus.json` — canonical extracted S-1 dataset, mirrored into `frontend/src/`

## Features

- **Live Market Tracker**: Real-time Hyperliquid pre-IPO perpetual (`io:ANTH`) candles, implied valuation ($2.04T), and day changes.
- **Interactive Trade Workbench**: Long/short trade simulator with leverage, margin calculations, and direct execution link to Hyperliquid.
- **Roadshow Valuation Sensitivity Model**: Interactive sliders for 2026/2027 revenue run-rate and P/S multiples.
- **Offering Mechanics**: Multi-class voting (Class A, Class B 10x votes, Class T safety trust), Delaware PBC protections, and tiered lock-up schedule.
- **Financial Breakdown**: 12× YoY revenue surge to $4.62B in 2025, gross margin expansion to 58%, and demystification of the non-cash $33.86B mark-to-market accounting charge.
- **Compute Moat**: Deep-dive into the $518 billion infrastructure obligations across AWS Trainium and Google Cloud TPUs.
- **Governance**: The Long-Term Benefit Trust (LTBT) architecture and Responsible Scaling Policy (RSP).

## Local dev

```bash
# Install dependencies
just install

# Run frontend + backend together
just dev
```

## Deploy

```bash
git push origin main
```

Dokploy app `anthropic-chart` on host `ct` (dokploy.algoentropy.com), served at https://anthropic.algoentropy.com.
