# AGENTS.md

Guidance for AI agents working in this repo. Keep it current when workflows change.

## What this is

**ANTH — "The Anthropic IPO, charted & traded."** A single-page site that visualises Anthropic PBC's Form S-1 prospectus (primary-source breakdown), plus a live pre-IPO perpetual market tracker and interactive trade simulator. Deployed at https://anthropic.algoentropy.com.

## Stack & layout

- `frontend/` — Vite + React 19 + TypeScript + Tailwind v4 + Recharts. Single page application with in-page anchor navigation.
- `main.py` — FastAPI. Serves the built SPA from `frontend/dist` and exposes:
  - `GET /api/prices` (live Hyperliquid `io:ANTH` candle snapshot)
  - `GET /api/orderbook` (live Hyperliquid L2 bids/asks)
  - `GET /api/filings` (SEC DRS status and filings feed)
- `data/prospectus.json` — canonical extracted S-1 data.
- `justfile` — task runner. Run `just` to list recipes.
- `Dockerfile` — multi-stage (node 24 build → python 3.14 serve).

## Common tasks (use `just`)

- `just install` — frontend npm + `uv sync`.
- `just dev` — backend + frontend together.
- `just build` — frontend → `frontend/dist`.
- `just typecheck` — `tsc -b`.
- `just serve` — build, then serve SPA + API from one uvicorn.
- `just sync-data` — copies `data/prospectus.json` to `frontend/src/prospectus.json`.
- `just deploy` — `git push origin main`.

## Data flow

`data/prospectus.json` is canonical. Edit `data/prospectus.json`, then run `just sync-data`.

## Deployments

- **`origin`** (GitHub: `cliffxuan/anthropic`) — pushing to `main` triggers automatic Dokploy rebuild and redeployment on host `ct` via webhook/polling.
- Dokploy application: `anthropic-chart` (`0ndCZke6pU-yT91WkKS7B`).
- Live domain: `https://anthropic.algoentropy.com`.
