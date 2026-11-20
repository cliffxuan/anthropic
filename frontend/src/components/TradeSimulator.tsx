import { useState } from "react";
import { Section, Card } from "./Section";
import { usePrices } from "../usePrices";
import { useOrderbook } from "../useOrderbook";
import {
  TrendingUp,
  TrendingDown,
  Sliders,
  Layers,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

const FD_SHARES_B = 18.1376; // 18,137,587,875 FD shares (424B4 p. 25)
const BASIC_SHARES_B = 13.2196; // 13,219,642,276 Basic shares

export function TradeSimulator() {
  const { data: px } = usePrices();
  const { data: ob } = useOrderbook();

  const currentSharePx = px?.xyz_ant?.price ?? px?.latest.stock ?? 87.6;

  // Simulator state (per-share xyz:ANT / Nasdaq ANT)
  const [tab, setTab] = useState<"trade" | "valuation" | "orderbook">("trade");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [collateral, setCollateral] = useState<number>(5000);
  const [leverage, setLeverage] = useState<number>(3);
  const [exitSharePrice, setExitSharePrice] = useState<number>(115);

  // Valuation model state (updated for 424(b)(4): $81B Oct run-rate, 18.138B FD shares)
  const [projectedRevenue, setProjectedRevenue] = useState<number>(81.0); // $81.0B Oct 2026 annualized run-rate
  const [psMultiple, setPsMultiple] = useState<number>(20); // 20x ARR (~$1.62T FDV)

  // Calculations for Trade Simulator
  const notional = collateral * leverage;
  const shares = notional / currentSharePx;
  const priceDiff = direction === "long" ? exitSharePrice - currentSharePx : currentSharePx - exitSharePrice;
  const pnlUSD = shares * priceDiff;
  const roePct = (pnlUSD / collateral) * 100;
  const liqBuffer = 1 / leverage;
  const liqPrice =
    direction === "long"
      ? currentSharePx * (1 - liqBuffer * 0.9)
      : currentSharePx * (1 + liqBuffer * 0.9);

  // Valuation model calculations
  const modeledFdvT = (projectedRevenue * psMultiple) / 1000;
  const modeledSharePrice = (modeledFdvT * 1000) / FD_SHARES_B;
  const modeledBasicCapT = (modeledSharePrice * BASIC_SHARES_B) / 1000;
  const modeledVsCurrentPct = ((modeledSharePrice - currentSharePx) / currentSharePx) * 100;

  return (
    <Section
      id="trade"
      eyebrow="Interactive · Trade Nasdaq: ANT & Hyperliquid xyz:ANT"
      title="Post-IPO Trade Simulator & Valuation Workbench"
      blurb="Simulate long or short positions on Hyperliquid's per-share xyz:ANT perpetual contract (or Nasdaq: ANT spot), stress-test valuation multiples against the $81B October 2026 annualized revenue run-rate and 18.14B fully diluted share count from Form 424(b)(4), and inspect live L2 order book depth."
      sourceUrl="https://app.hyperliquid.xyz/trade/xyz:ANT"
      sourceLabel="Trade xyz:ANT on Hyperliquid"
    >
      {/* Tabs */}
      <div className="flex border-b border-[#292624] mb-8">
        <button
          onClick={() => setTab("trade")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
            tab === "trade"
              ? "border-[#da7756] text-[#da7756]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <TrendingUp size={16} />
          Per-Share Trade Simulator (xyz:ANT)
        </button>
        <button
          onClick={() => setTab("valuation")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
            tab === "valuation"
              ? "border-[#da7756] text-[#da7756]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sliders size={16} />
          Valuation Multiples Workbench
        </button>
        <button
          onClick={() => setTab("orderbook")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
            tab === "orderbook"
              ? "border-[#da7756] text-[#da7756]"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Layers size={16} />
          Live Order Book & Spread (xyz:ANT)
        </button>
      </div>

      {/* Tab 1: Perpetual Trade Simulator */}
      {tab === "trade" && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Controls */}
          <Card className="lg:col-span-6 space-y-6">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400">Position Direction</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDirection("long")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
                    direction === "long"
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                      : "border border-[#38332f] bg-[#1a1715] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <TrendingUp size={16} /> LONG (Bullish)
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("short")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
                    direction === "short"
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                      : "border border-[#38332f] bg-[#1a1715] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <TrendingDown size={16} /> SHORT (Bearish)
                </button>
              </div>
            </div>

            {/* Collateral */}
            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">Margin Collateral (USDC)</label>
                <span className="font-mono text-zinc-300 font-semibold tabular">${collateral.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex gap-2">
                {[1000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCollateral(amt)}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-mono transition ${
                      collateral === amt
                        ? "border-[#da7756] bg-[#da7756]/20 text-[#da7756]"
                        : "border-[#2e2a27] bg-[#161413] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    ${amt >= 1000 ? `${amt / 1000}k` : amt}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={collateral}
                onChange={(e) => setCollateral(Number(e.target.value))}
                className="mt-3 w-full accent-[#da7756]"
              />
            </div>

            {/* Leverage */}
            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">Leverage (1× = Spot ANT Equivalent)</label>
                <span className="font-mono text-[#da7756] font-bold">{leverage}×</span>
              </div>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 5, 10].map((lev) => (
                  <button
                    key={lev}
                    type="button"
                    onClick={() => setLeverage(lev)}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-mono transition ${
                      leverage === lev
                        ? "border-[#da7756] bg-[#da7756]/20 text-[#da7756]"
                        : "border-[#2e2a27] bg-[#161413] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {lev}×
                  </button>
                ))}
              </div>
            </div>

            {/* Target Share Price Scenarios */}
            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">Target Exit Share Price ($/sh)</label>
                <span className="font-mono text-zinc-200 font-semibold tabular">
                  ${exitSharePrice.toFixed(2)}/sh (${((exitSharePrice * FD_SHARES_B) / 1000).toFixed(2)}T FDV)
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "IPO Price ($1.51T)", px: 83 },
                  { label: "Day 1 Close ($1.76T)", px: 97.17 },
                  { label: "Day 1 High ($2.09T)", px: 115.1 },
                  { label: "PBF Trigger (+50%)", px: 124.5 },
                ].map((s) => (
                  <button
                    key={s.px}
                    type="button"
                    onClick={() => setExitSharePrice(s.px)}
                    className={`rounded-lg border p-2 text-left text-xs font-mono transition ${
                      Math.abs(exitSharePrice - s.px) < 0.2
                        ? "border-[#da7756] bg-[#da7756]/20 text-zinc-100"
                        : "border-[#2e2a27] bg-[#161413] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500">{s.label}</div>
                    <div className="font-semibold text-zinc-200">${s.px.toFixed(2)}</div>
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={50}
                max={200}
                step={0.5}
                value={exitSharePrice}
                onChange={(e) => setExitSharePrice(Number(e.target.value))}
                className="mt-3 w-full accent-[#da7756]"
              />
            </div>
          </Card>

          {/* Results Output */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="bg-gradient-to-br from-[#1c1816] via-[#141211] to-[#0f0e0d] border-[#38332f]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#da7756] flex items-center justify-between">
                <span>Simulated Outcome</span>
                <span className="text-zinc-400 font-normal">Entry: ${currentSharePx.toFixed(2)} / sh</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4">
                  <div className="text-xs text-zinc-500 font-mono">Estimated P&L</div>
                  <div
                    className={`mt-1 text-2xl font-bold tabular ${
                      pnlUSD >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {pnlUSD >= 0 ? "+" : ""}${pnlUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {roePct >= 0 ? "+" : ""}{roePct.toFixed(1)}% ROE
                  </div>
                </div>

                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4">
                  <div className="text-xs text-zinc-500 font-mono">Position Notional</div>
                  <div className="mt-1 text-2xl font-bold tabular text-zinc-100">
                    ${notional.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {shares.toFixed(1)} ANT shares
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-xs text-zinc-300 border-t border-[#262321] pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Estimated Liquidation Share Price:</span>
                  <span className="font-mono text-amber-400 tabular font-semibold">
                    ${liqPrice.toFixed(2)} / sh (~${((liqPrice * FD_SHARES_B) / 1000).toFixed(2)}T FDV)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Target Basic Market Cap (13.22B sh):</span>
                  <span className="font-mono text-zinc-300 tabular">
                    ${((exitSharePrice * BASIC_SHARES_B) / 1000).toFixed(2)} Trillion
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Target Fully Diluted Cap (18.14B sh):</span>
                  <span className="font-mono text-zinc-300 tabular">
                    ${((exitSharePrice * FD_SHARES_B) / 1000).toFixed(2)} Trillion
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://app.hyperliquid.xyz/trade/xyz:ANT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#da7756] py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
                >
                  <TrendingUp size={16} /> Execute Trade on Hyperliquid (xyz:ANT) <ExternalLink size={14} />
                </a>
              </div>
            </Card>

            <div className="rounded-xl border border-[#2b2725] bg-[#141211]/60 p-4 text-xs text-zinc-400 space-y-1.5">
              <div className="font-medium text-zinc-300 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-amber-400" /> Perpetual Derivative Disclaimer
              </div>
              <p className="leading-relaxed text-[11px] text-zinc-500">
                xyz:ANT ($/share) and io:ANTH ($B valuation) are synthetic perpetual futures contracts on Hyperliquid settled in USDC. They do not convey Class A stockholder voting rights or economic ownership in Anthropic, PBC (Nasdaq: ANT).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Valuation Multiples Workbench */}
      {tab === "valuation" && (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-6 space-y-6">
            <div className="border-b border-[#292624] pb-4">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <Sliders size={18} className="text-[#da7756]" />
                Form 424(b)(4) Post-IPO Valuation Model
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Calibrated to Anthropic's $81B October 2026 annualized revenue run-rate, 18.14B fully diluted shares, and 13.22B basic shares.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">Annualized Run-Rate / NTM Revenue</label>
                <span className="font-mono text-[#da7756] font-bold tabular text-sm">
                  ${projectedRevenue.toFixed(1)} Billion
                </span>
              </div>
              <input
                type="range"
                min={35}
                max={160}
                step={1}
                value={projectedRevenue}
                onChange={(e) => setProjectedRevenue(Number(e.target.value))}
                className="mt-3 w-full accent-[#da7756]"
              />
              <div className="mt-2 flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$35.3B (TTM Q3'26)</span>
                <span>$81B (Oct '26 Run-Rate)</span>
                <span>$160B (2027E Bull)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">FDV / Run-Rate Multiple</label>
                <span className="font-mono text-zinc-200 font-bold tabular text-sm">
                  {psMultiple}× ARR
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={45}
                step={0.5}
                value={psMultiple}
                onChange={(e) => setPsMultiple(Number(e.target.value))}
                className="mt-3 w-full accent-[#da7756]"
              />
              <div className="mt-2 flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>13.5× ($83 Basic Cap)</span>
                <span>18.6× ($83 IPO FDV)</span>
                <span>35× (AI Frontier)</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4 text-xs text-zinc-300 space-y-2">
              <div className="font-semibold text-zinc-200">Comparable Valuation Benchmarks (Nov 2026):</div>
              <div className="flex justify-between text-zinc-400">
                <span>Anthropic IPO ($83.00/sh · $1.51T FDV):</span>
                <span className="font-mono text-emerald-400">18.6× Oct Run-Rate ($81B)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Anthropic Day 1 Close ($97.17/sh · $1.76T FDV):</span>
                <span className="font-mono text-[#da7756]">21.8× Oct Run-Rate ($81B)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Nvidia (NVDA):</span>
                <span className="font-mono text-zinc-200">~25× NTM Sales</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Palantir (PLTR):</span>
                <span className="font-mono text-zinc-200">~38× NTM Sales</span>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-6 space-y-4">
            <Card className="bg-gradient-to-br from-[#1c1816] via-[#141211] to-[#0f0e0d] border-[#38332f]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#da7756]">
                Modeled Valuation Output
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4">
                  <div className="text-xs text-zinc-500 font-mono">Modeled FDV / Basic Cap</div>
                  <div className="mt-1 text-3xl font-bold tabular text-zinc-100">
                    ${modeledFdvT.toFixed(2)}T
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    ${modeledBasicCapT.toFixed(2)}T Basic Cap (13.22B sh)
                  </div>
                </div>

                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4">
                  <div className="text-xs text-zinc-500 font-mono">Implied ANT Share Price</div>
                  <div className="mt-1 text-3xl font-bold tabular text-[#da7756]">
                    ${modeledSharePrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {modeledSharePrice >= 83 ? "+" : ""}
                    {(((modeledSharePrice - 83) / 83) * 100).toFixed(1)}% vs. $83.00 IPO
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-[#262321] pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Live Market Share Price (ANT / xyz:ANT):</span>
                  <span className="font-mono text-zinc-200 font-semibold tabular">${currentSharePx.toFixed(2)} / sh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Modeled vs. Live Market Price:</span>
                  <span
                    className={`font-mono font-semibold tabular ${
                      modeledVsCurrentPct >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {modeledVsCurrentPct >= 0 ? "+" : ""}
                    {modeledVsCurrentPct.toFixed(1)}% {modeledVsCurrentPct >= 0 ? "Upside" : "Downside"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Pro Forma Net Cash Backing ($232.35B):</span>
                  <span className="font-mono text-emerald-400 tabular">
                    $17.58 / basic sh ($12.81 / FD sh)
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://app.hyperliquid.xyz/trade/xyz:ANT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#da7756] py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b]"
                >
                  <TrendingUp size={16} /> Trade xyz:ANT on Hyperliquid
                </a>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 3: Live Order Book */}
      {tab === "orderbook" && (
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-8">
            <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-300">
                <Layers size={14} className="text-[#da7756]" /> Live L2 Order Book · {ob?.coin ?? "xyz:ANT"} ($/Share)
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-zinc-500">Spread:</span>
                <span className="font-mono text-zinc-200 tabular font-semibold">
                  ${ob?.spread ?? 0.04}
                </span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-500">Mid:</span>
                <span className="font-mono text-[#da7756] tabular font-semibold">
                  ${ob?.mid ?? currentSharePx}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Bids */}
              <div>
                <div className="mb-2 text-[11px] font-mono uppercase text-emerald-400 flex justify-between">
                  <span>Bid Price ($/sh)</span>
                  <span>Size (Shares)</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  {(ob?.bids && ob.bids.length > 0
                    ? ob.bids
                    : [
                        { px: 87.58, sz: 145.2 },
                        { px: 87.55, sz: 310.0 },
                        { px: 87.5, sz: 820.5 },
                        { px: 87.45, sz: 1240.0 },
                        { px: 87.4, sz: 2150.0 },
                      ]
                  ).map((b, i) => (
                    <div key={i} className="flex justify-between py-1 px-2 rounded bg-emerald-500/5 text-zinc-300">
                      <span className="text-emerald-400 font-semibold tabular">${b.px.toFixed(2)}</span>
                      <span className="tabular text-zinc-400">{b.sz.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div>
                <div className="mb-2 text-[11px] font-mono uppercase text-red-400 flex justify-between">
                  <span>Ask Price ($/sh)</span>
                  <span>Size (Shares)</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  {(ob?.asks && ob.asks.length > 0
                    ? ob.asks
                    : [
                        { px: 87.62, sz: 120.4 },
                        { px: 87.65, sz: 295.0 },
                        { px: 87.7, sz: 640.0 },
                        { px: 87.75, sz: 1180.0 },
                        { px: 87.8, sz: 1950.0 },
                      ]
                  ).map((a, i) => (
                    <div key={i} className="flex justify-between py-1 px-2 rounded bg-red-500/5 text-zinc-300">
                      <span className="text-red-400 font-semibold tabular">${a.px.toFixed(2)}</span>
                      <span className="tabular text-zinc-400">{a.sz.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-4 space-y-4">
            <Card>
              <h4 className="text-xs font-mono uppercase text-zinc-400">Venue Specifications</h4>
              <div className="mt-3 space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Spot Underlying:</span>
                  <span className="font-mono text-emerald-400">NasdaqGS: ANT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Perp Venue:</span>
                  <span>Hyperliquid HIP-3 (xyz:ANT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CUSIP:</span>
                  <span className="font-mono text-zinc-300">03703U 107</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Max Perp Leverage:</span>
                  <span className="font-mono text-zinc-300">10×</span>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href="https://app.hyperliquid.xyz/trade/xyz:ANT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#da7756] py-2.5 text-xs font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b]"
                >
                  <TrendingUp size={14} /> Open Order on Hyperliquid
                </a>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Section>
  );
}
