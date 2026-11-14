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

export function TradeSimulator() {
  const { data: px } = usePrices();
  const { data: ob } = useOrderbook();

  const currentPrice = px?.latest.price ?? 1771.3;

  // Simulator state
  const [tab, setTab] = useState<"trade" | "valuation" | "orderbook">("trade");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [collateral, setCollateral] = useState<number>(5000);
  const [leverage, setLeverage] = useState<number>(3);
  const [exitPrice, setExitPrice] = useState<number>(2000);

  // Valuation model state (updated for Nov 2026 S-1/A: $81B Oct ARR, ~18.05B FD shares)
  const [projectedRevenue, setProjectedRevenue] = useState<number>(81.0); // $81.0B Oct 2026 ARR
  const [psMultiple, setPsMultiple] = useState<number>(22); // 22x ARR (~$1.78T cap)

  // Calculations for Trade Simulator
  const notional = collateral * leverage;
  const contracts = notional / currentPrice;
  const priceDiff = direction === "long" ? exitPrice - currentPrice : currentPrice - exitPrice;
  const pnlUSD = contracts * priceDiff;
  const roePct = (pnlUSD / collateral) * 100;
  const liqBuffer = 1 / leverage;
  const liqPrice =
    direction === "long"
      ? currentPrice * (1 - liqBuffer * 0.9)
      : currentPrice * (1 + liqBuffer * 0.9);

  // Valuation model calculations (18.05B fully diluted shares -> $78/sh at $1.41T FDV)
  const modeledMarketCapT = (projectedRevenue * psMultiple) / 1000;
  const modeledSharePrice = (modeledMarketCapT * 1000) / 18.05; // 18.05B fully diluted shares
  const modeledIndexLevel = modeledMarketCapT * 1000;
  const modeledVsCurrentPct = ((modeledIndexLevel - currentPrice) / currentPrice) * 100;

  return (
    <Section
      id="trade"
      eyebrow="Interactive · Trade the Anthropic IPO"
      title="IPO Trade Simulator & Valuation Workbench"
      blurb="Model scenarios for the November 19 Nasdaq: ANT debut. Simulate long or short positions on the Hyperliquid io:ANTH pre-IPO perpetual contract, stress-test valuation multiples against the $81B October ARR and $70–$78 S-1/A price range, and inspect live order book depth."
      sourceUrl="https://app.hyperliquid.xyz/trade/io:ANTH"
      sourceLabel="Trade Live on Hyperliquid"
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
          Perpetual Trade Simulator
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
          Live Order Book & Spread
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
                <label className="font-mono uppercase text-zinc-400">Leverage</label>
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

            {/* Target Price Scenarios */}
            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">Target Exit Valuation / Price</label>
                <span className="font-mono text-zinc-200 font-semibold tabular">
                  ${exitPrice.toFixed(0)} (${(exitPrice / 1000).toFixed(2)}T cap)
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "S-1/A Low ($1.26T)", px: 1260 },
                  { label: "S-1/A Top ($1.41T)", px: 1410 },
                  { label: "IPO Pop ($2.0T)", px: 2000 },
                  { label: "Supercycle ($2.5T)", px: 2500 },
                ].map((s) => (
                  <button
                    key={s.px}
                    type="button"
                    onClick={() => setExitPrice(s.px)}
                    className={`rounded-lg border p-2 text-left text-xs font-mono transition ${
                      exitPrice === s.px
                        ? "border-[#da7756] bg-[#da7756]/20 text-zinc-100"
                        : "border-[#2e2a27] bg-[#161413] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500">{s.label}</div>
                    <div className="font-semibold text-zinc-200">${s.px}</div>
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={900}
                max={3500}
                step={25}
                value={exitPrice}
                onChange={(e) => setExitPrice(Number(e.target.value))}
                className="mt-3 w-full accent-[#da7756]"
              />
            </div>
          </Card>

          {/* Results Output */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="bg-gradient-to-br from-[#1c1816] via-[#141211] to-[#0f0e0d] border-[#38332f]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#da7756] flex items-center justify-between">
                <span>Simulated Outcome</span>
                <span className="text-zinc-400 font-normal">Entry: ${currentPrice.toFixed(2)}</span>
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
                    {contracts.toFixed(3)} ANTH units
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-xs text-zinc-300 border-t border-[#262321] pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Estimated Liquidation Price:</span>
                  <span className="font-mono text-amber-400 tabular font-semibold">
                    ${liqPrice.toFixed(1)} (~${(liqPrice / 1000).toFixed(2)}T valuation)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Implied ANT Share Price:</span>
                  <span className="font-mono text-zinc-300 tabular">${(exitPrice / 18.05).toFixed(2)} / sh (vs $70–$78 IPO)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Implied Target Cap:</span>
                  <span className="font-mono text-zinc-300 tabular">${(exitPrice / 1000).toFixed(2)} Trillion</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={`https://app.hyperliquid.xyz/trade/io:ANTH`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#da7756] py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
                >
                  <TrendingUp size={16} /> Execute Trade on Hyperliquid (io:ANTH) <ExternalLink size={14} />
                </a>
              </div>
            </Card>

            <div className="rounded-xl border border-[#2b2725] bg-[#141211]/60 p-4 text-xs text-zinc-400 space-y-1.5">
              <div className="font-medium text-zinc-300 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-amber-400" /> Pre-IPO Derivative Disclaimer
              </div>
              <p className="leading-relaxed text-[11px] text-zinc-500">
                io:ANTH is a synthetic perpetual futures contract on Hyperliquid tracking an oracle price of Anthropic's implied equity valuation. It is not an equity share of Class A common stock (Nasdaq: ANT) offered by Anthropic PBC.
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
                S-1/A Roadshow Pricing Sensitivity Model
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Calibrated to Anthropic's $81B October 2026 annualized revenue run-rate and ~18.05B fully diluted shares.
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
                min={30}
                max={150}
                step={1}
                value={projectedRevenue}
                onChange={(e) => setProjectedRevenue(Number(e.target.value))}
                className="mt-3 w-full accent-[#da7756]"
              />
              <div className="mt-2 flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$44B (9M26 Ann.)</span>
                <span>$81B (Oct 2026 ARR)</span>
                <span>$150B (2027E Bull)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase text-zinc-400">EV / ARR Multiple</label>
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
                <span>17.4× ($1.41T S-1/A Top)</span>
                <span>22× (Perp Implied)</span>
                <span>35× (AI Premium)</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4 text-xs text-zinc-300 space-y-2">
              <div className="font-semibold text-zinc-200">Comparable Valuation Benchmarks (Nov 2026):</div>
              <div className="flex justify-between text-zinc-400">
                <span>Anthropic S-1/A Top ($78/sh · $1.41T FDV):</span>
                <span className="font-mono text-emerald-400">17.4× Oct ARR ($81B)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Anthropic Hyperliquid Perp (~$1.77T):</span>
                <span className="font-mono text-[#da7756]">21.9× Oct ARR ($81B)</span>
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
                  <div className="text-xs text-zinc-500 font-mono">Modeled FDV Market Cap</div>
                  <div className="mt-1 text-3xl font-bold tabular text-zinc-100">
                    ${modeledMarketCapT.toFixed(2)}T
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    {modeledMarketCapT >= 1.41 ? "Above $1.41T S-1/A top" : "Within/below S-1/A range"}
                  </div>
                </div>

                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4">
                  <div className="text-xs text-zinc-500 font-mono">Implied ANT Share Price</div>
                  <div className="mt-1 text-3xl font-bold tabular text-[#da7756]">
                    ${modeledSharePrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    vs. $70–$78 S-1/A range
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-[#262321] pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Hyperliquid Live Implied Price:</span>
                  <span className="font-mono text-zinc-200 font-semibold tabular">${currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Modeled vs. Live Perp Market:</span>
                  <span
                    className={`font-mono font-semibold tabular ${
                      modeledVsCurrentPct >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {modeledVsCurrentPct >= 0 ? "+" : ""}
                    {modeledVsCurrentPct.toFixed(1)}% {modeledVsCurrentPct >= 0 ? "Premium" : "Discount"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">vs. S-1/A Top Range ($78.00 / $1.41T):</span>
                  <span className="font-mono text-zinc-300 tabular">
                    {modeledMarketCapT >= 1.41 ? "+" : ""}
                    {(((modeledMarketCapT - 1.41) / 1.41) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://app.hyperliquid.xyz/trade/io:ANTH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#da7756] py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b]"
                >
                  <TrendingUp size={16} /> Trade the Spread on Hyperliquid
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
                <Layers size={14} className="text-[#da7756]" /> Live L2 Order Book · io:ANTH
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-zinc-500">Spread:</span>
                <span className="font-mono text-zinc-200 tabular font-semibold">
                  ${ob?.spread ?? 0.1}
                </span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-500">Mid:</span>
                <span className="font-mono text-[#da7756] tabular font-semibold">
                  ${ob?.mid ?? currentPrice}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Bids */}
              <div>
                <div className="mb-2 text-[11px] font-mono uppercase text-emerald-400 flex justify-between">
                  <span>Bid Price ($)</span>
                  <span>Size (Units)</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  {(ob?.bids && ob.bids.length > 0
                    ? ob.bids
                    : [
                        { px: 1771.2, sz: 0.115 },
                        { px: 1771.1, sz: 0.177 },
                        { px: 1770.9, sz: 0.086 },
                        { px: 1770.8, sz: 0.186 },
                        { px: 1770.7, sz: 0.172 },
                      ]
                  ).map((b, i) => (
                    <div key={i} className="flex justify-between py-1 px-2 rounded bg-emerald-500/5 text-zinc-300">
                      <span className="text-emerald-400 font-semibold tabular">${b.px.toFixed(1)}</span>
                      <span className="tabular text-zinc-400">{b.sz.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div>
                <div className="mb-2 text-[11px] font-mono uppercase text-red-400 flex justify-between">
                  <span>Ask Price ($)</span>
                  <span>Size (Units)</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  {(ob?.asks && ob.asks.length > 0
                    ? ob.asks
                    : [
                        { px: 1771.3, sz: 0.084 },
                        { px: 1771.6, sz: 0.423 },
                        { px: 1771.7, sz: 0.148 },
                        { px: 1772.0, sz: 0.078 },
                        { px: 1772.2, sz: 0.025 },
                      ]
                  ).map((a, i) => (
                    <div key={i} className="flex justify-between py-1 px-2 rounded bg-red-500/5 text-zinc-300">
                      <span className="text-red-400 font-semibold tabular">${a.px.toFixed(1)}</span>
                      <span className="tabular text-zinc-400">{a.sz.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-4 space-y-4">
            <Card>
              <h4 className="text-xs font-mono uppercase text-zinc-400">Order Book Metrics</h4>
              <div className="mt-3 space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Market Type:</span>
                  <span>Hyperliquid HIP-3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Maker Fee:</span>
                  <span className="font-mono text-emerald-400">0.00%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Taker Fee:</span>
                  <span className="font-mono text-zinc-300">0.035%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Max Leverage:</span>
                  <span className="font-mono text-zinc-300">10×</span>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href="https://app.hyperliquid.xyz/trade/io:ANTH"
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
