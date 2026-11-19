import { type ReactNode, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section, Card, Stat } from "./Section";
import { usePrices } from "../usePrices";
import { Activity, TrendingUp, TrendingDown, ExternalLink, ArrowLeftRight, Calculator } from "lucide-react";

const HL_URL = "https://app.hyperliquid.xyz/trade/io:ANTH";
const HL_XYZ_URL = "https://app.hyperliquid.xyz/trade/xyz:ANT";
const FD_SHARES_B = 18.07; // 18.07B fully diluted shares ($83/sh = $1.50T FDV)
const BASIC_SHARES_B = 13.23; // 13.23B post-IPO Class A + Class N shares (after 980M upsize)
const FINAL_IPO_PX = 83.0; // $83.00 final IPO price (Nov 18, 2026)

export function PriceTracker() {
  const { data: d, err } = usePrices();

  const price = d?.latest.price ?? 1811.8;
  const prevClose = d?.latest.prev_close ?? 1717.8;
  const dayChange = d?.latest.day_change_pct ?? 5.47;
  const isUp = dayChange >= 0;
  const impliedCapT = d?.latest.implied_valuation_t ?? 1.812;
  const impliedSharePriceFD = d?.latest.implied_share_price_fd ?? Number((price / FD_SHARES_B).toFixed(2));
  const vsIpoPct = (((impliedSharePriceFD - FINAL_IPO_PX) / FINAL_IPO_PX) * 100);
  const vsS1AMidPct = (((impliedSharePriceFD - 74.0) / 74.0) * 100);

  const xyzPrice = d?.xyz_ant?.price ?? 103.0;
  const xyzChange = d?.xyz_ant?.day_change_pct ?? 4.75;
  const xyzIsUp = xyzChange >= 0;
  const xyzFdvT = d?.xyz_ant?.implied_fdv_t ?? Number(((xyzPrice * FD_SHARES_B) / 1000).toFixed(3));
  const xyzBasicCapT = d?.xyz_ant?.implied_basic_cap_t ?? Number(((xyzPrice * BASIC_SHARES_B) / 1000).toFixed(3));
  const xyzVsIpoPct = d?.xyz_ant?.vs_s1a_top_pct ?? Number((((xyzPrice - FINAL_IPO_PX) / FINAL_IPO_PX) * 100).toFixed(1));
  const xyzVsMidPct = d?.xyz_ant?.vs_s1a_mid_pct ?? Number((((xyzPrice - 74.0) / 74.0) * 100).toFixed(1));

  const seriesH = d?.series_h_valuation_t ? d.series_h_valuation_t * 1000 : 965;
  const target = d?.target_valuation_t ? d.target_valuation_t * 1000 : 1500;

  // Interactive converter state (initialized to live io:ANTH valuation)
  const [customPerpVal, setCustomPerpVal] = useState<number | null>(null);
  const activePerpVal = customPerpVal ?? price;
  const activeSharePx = activePerpVal / FD_SHARES_B;
  const activeBasicCapB = activeSharePx * BASIC_SHARES_B;
  const activePopVs83 = ((activeSharePx - FINAL_IPO_PX) / FINAL_IPO_PX) * 100;
  const activePopVs74 = ((activeSharePx - 74) / 74) * 100;

  return (
    <Section
      id="market"
      eyebrow="Live · Pre-IPO Derivative Market & Share Price Conversion"
      title="Hyperliquid Live Perps → Implied Share Price vs. $83.00 IPO"
      blurb={`Following Anthropic's upsized $83.00/share IPO pricing ($1.50T FDV · $81.34B IPO), Hyperliquid perpetuals are pricing in a +21% to +24% debut pop on November 19: Entropy's valuation-indexed io:ANTH trades at $${price.toFixed(1)} (~$${impliedSharePriceFD.toFixed(2)}/sh) and Trade.xyz's per-share xyz:ANT trades at $${xyzPrice.toFixed(2)}/sh.`}
      sourceUrl={HL_URL}
      sourceLabel="Hyperliquid · io:ANTH & xyz:ANT"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <Activity size={14} className="text-[#da7756]" /> Daily Close · Implied Valuation ($B) & Share Price
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-[11px] font-mono text-zinc-400">Hyperliquid L1 Oracle</span>
            </div>
          </div>

          <div className="h-80">
            {err && !d ? (
              <Centered>Couldn't load live prices. Retrying…</Centered>
            ) : !d ? (
              <Centered>Loading live Hyperliquid candles…</Centered>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={d.series} margin={{ top: 12, right: 24, left: 4, bottom: 0 }}>
                  <CartesianGrid stroke="#262321" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    stroke="#716b67"
                    fontSize={11}
                    tickFormatter={(v: string) => v.slice(5)}
                    minTickGap={24}
                  />
                  <YAxis
                    stroke="#716b67"
                    fontSize={11}
                    domain={[
                      (dataMin: number) => Math.floor(Math.min(dataMin, seriesH) * 0.95),
                      (dataMax: number) => Math.ceil(Math.max(dataMax, target) * 1.05),
                    ]}
                    tickFormatter={(v: number) => `$${v}`}
                    width={52}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#161413",
                      border: "1px solid #38332f",
                      borderRadius: 10,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                    }}
                    formatter={(v: number) => [
                      `$${v.toFixed(1)} ($${(v / 1000).toFixed(3)}T FDV · ~$${(v / FD_SHARES_B).toFixed(2)}/sh)`,
                      "io:ANTH Perp",
                    ]}
                  />
                  <ReferenceLine
                    y={target}
                    stroke="#da7756"
                    strokeDasharray="4 4"
                    label={{
                      value: `Final IPO Pricing: $${target} ($1.50T @ $83/sh)`,
                      position: "insideTopRight",
                      fill: "#da7756",
                      fontSize: 11,
                    }}
                  />
                  <ReferenceLine
                    y={seriesH}
                    stroke="#71717a"
                    strokeDasharray="3 3"
                    label={{
                      value: `Series H: $${seriesH} ($965B · ~$53.4/sh)`,
                      position: "insideBottomRight",
                      fill: "#a1a1aa",
                      fontSize: 11,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="perp"
                    name="io:ANTH"
                    stroke="#da7756"
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded bg-[#da7756]" /> io:ANTH daily close (Hyperliquid)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded border-t border-dashed border-[#da7756]" /> $1.50T Final IPO Pricing ($83.00/sh)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded border-t border-dashed border-zinc-500" /> $965B Series H post-money
            </span>
          </div>
        </Card>

        {/* Live stats sidebar */}
        <div className="space-y-4 lg:col-span-4">
          <Card className="bg-gradient-to-br from-[#da7756]/10 via-[#171514] to-[#100e0d]">
            <Stat
              label="io:ANTH (Valuation Perp) → Share Price"
              value={`~$${impliedSharePriceFD.toFixed(2)} / sh`}
              accent="text-[#da7756]"
              sub={
                <span className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="font-mono text-zinc-200 font-semibold">${price.toFixed(1)} idx (${impliedCapT.toFixed(3)}T)</span>
                  <span className="text-zinc-500">·</span>
                  <span className={`inline-flex items-center gap-0.5 font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isUp ? "+" : ""}{dayChange.toFixed(2)}%
                  </span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-emerald-400 font-mono">+{vsIpoPct.toFixed(1)}% vs $83 IPO</span>
                </span>
              }
            />
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <Stat
              label="xyz:ANT (Direct Per-Share Perp)"
              value={`$${xyzPrice.toFixed(2)} / sh`}
              accent="text-emerald-400"
              sub={
                <span className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="font-mono text-zinc-200 font-semibold">${xyzFdvT.toFixed(3)}T FDV</span>
                  <span className="text-zinc-500">·</span>
                  <span className={`inline-flex items-center gap-0.5 font-semibold ${xyzIsUp ? "text-emerald-400" : "text-red-400"}`}>
                    {xyzIsUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {xyzIsUp ? "+" : ""}{xyzChange.toFixed(2)}%
                  </span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-emerald-400 font-mono">+{xyzVsIpoPct.toFixed(1)}% vs $83 IPO</span>
                </span>
              }
            />
          </Card>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211] p-4 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center justify-between text-zinc-300 font-medium">
              <span>Final IPO Share Denominators</span>
              <span className="font-mono text-[#da7756]">Form 424(b)(4)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Fully Diluted Shares (FDV)</span>
              <span className="font-mono text-zinc-200">18.07 Billion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Basic Shares (Class A + N)</span>
              <span className="font-mono text-zinc-200">13.23 Billion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Final IPO Offer Price</span>
              <span className="font-mono text-emerald-400">$83.00 / sh (vs $70–$78 range)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={HL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#da7756] py-2.5 px-3 text-xs font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
            >
              Trade io:ANTH <ExternalLink size={12} />
            </a>
            <a
              href={HL_XYZ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#3a3532] bg-[#191716] py-2.5 px-3 text-xs font-semibold text-zinc-100 transition hover:border-[#da7756]/50"
            >
              Trade xyz:ANT <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Conversion Table & Interactive Calculator */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7 overflow-x-auto">
          <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
              <ArrowLeftRight size={15} /> Hyperliquid Perps → Implied IPO Share Price Conversion Table
            </div>
            <span className="text-[11px] font-mono text-zinc-500">18.07B FD · 13.23B Basic</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#262321] text-[10px] font-mono uppercase text-zinc-500">
                <th className="py-2 pr-3">Benchmark / Contract</th>
                <th className="py-2 px-2">Contract Quote</th>
                <th className="py-2 px-2">Implied ANT / Sh</th>
                <th className="py-2 px-2">Implied FDV Cap</th>
                <th className="py-2 pl-2 text-right">vs. $83 IPO (vs. $74 S-1/A Mid)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#221f1d] text-zinc-300">
              <tr className="bg-[#da7756]/5">
                <td className="py-3 pr-3">
                  <div className="font-semibold text-zinc-100">io:ANTH (Entropy)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Valuation Index ($1 = $1B)</div>
                </td>
                <td className="py-3 px-2 font-mono font-semibold text-[#da7756] tabular">
                  ${price.toFixed(2)}
                </td>
                <td className="py-3 px-2 font-mono font-bold text-zinc-100 tabular">
                  ~${impliedSharePriceFD.toFixed(2)} / sh
                </td>
                <td className="py-3 px-2 font-mono text-zinc-200 tabular">
                  ${impliedCapT.toFixed(3)}T
                  <div className="text-[10px] text-zinc-500">${((impliedSharePriceFD * BASIC_SHARES_B) / 1000).toFixed(2)}T basic</div>
                </td>
                <td className="py-3 pl-2 text-right font-mono tabular">
                  <span className="text-emerald-400 font-semibold">+{vsIpoPct.toFixed(1)}%</span>
                  <div className="text-[10px] text-zinc-400">+{vsS1AMidPct.toFixed(1)}% vs $74 mid</div>
                </td>
              </tr>

              <tr className="bg-emerald-500/5">
                <td className="py-3 pr-3">
                  <div className="font-semibold text-zinc-100">xyz:ANT (Trade.xyz)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Direct Per-Share ($ / sh)</div>
                </td>
                <td className="py-3 px-2 font-mono font-semibold text-emerald-400 tabular">
                  ${xyzPrice.toFixed(2)}
                </td>
                <td className="py-3 px-2 font-mono font-bold text-emerald-400 tabular">
                  ${xyzPrice.toFixed(2)} / sh
                </td>
                <td className="py-3 px-2 font-mono text-zinc-200 tabular">
                  ${xyzFdvT.toFixed(3)}T
                  <div className="text-[10px] text-zinc-500">${xyzBasicCapT.toFixed(2)}T basic</div>
                </td>
                <td className="py-3 pl-2 text-right font-mono tabular">
                  <span className="text-emerald-400 font-semibold">+{xyzVsIpoPct.toFixed(1)}%</span>
                  <div className="text-[10px] text-zinc-400">+{xyzVsMidPct.toFixed(1)}% vs $74 mid</div>
                </td>
              </tr>

              <tr>
                <td className="py-3 pr-3">
                  <div className="font-semibold text-zinc-100">Final IPO Pricing (Nov 18)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Nasdaq: ANT (980M sh · $81.34B)</div>
                </td>
                <td className="py-3 px-2 font-mono text-zinc-300 tabular">
                  1,500.0 idx
                </td>
                <td className="py-3 px-2 font-mono font-semibold text-zinc-100 tabular">
                  $83.00 / sh
                </td>
                <td className="py-3 px-2 font-mono text-zinc-200 tabular">
                  $1.500T
                  <div className="text-[10px] text-zinc-500">$1.098T basic</div>
                </td>
                <td className="py-3 pl-2 text-right font-mono text-zinc-400 tabular">
                  Official IPO Price
                </td>
              </tr>

              <tr>
                <td className="py-3 pr-3">
                  <div className="font-semibold text-zinc-400">Initial S-1/A Range</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Nov 10 Roadshow Guidance</div>
                </td>
                <td className="py-3 px-2 font-mono text-zinc-500 tabular">
                  1,265–1,409 idx
                </td>
                <td className="py-3 px-2 font-mono text-zinc-400 tabular">
                  $70.00–$78.00
                </td>
                <td className="py-3 px-2 font-mono text-zinc-400 tabular">
                  $1.26T–$1.41T
                  <div className="text-[10px] text-zinc-500">$917B–$1.02T basic</div>
                </td>
                <td className="py-3 pl-2 text-right font-mono text-zinc-500 tabular">
                  Upsized + Priced Above
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
            <strong className="text-zinc-300">Conversion Formula:</strong>{" "}
            <code className="text-[#da7756]">Implied ANT Share Price = io:ANTH Price ($B) ÷ 18.07B fully diluted shares</code>. Conversely,{" "}
            <code className="text-emerald-400">Implied FDV ($T) = (xyz:ANT Share Price × 18.07B) ÷ 1,000</code>.
          </p>
        </Card>

        {/* Interactive Perp <-> Share Price Calculator */}
        <Card className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-[#191615] via-[#131110] to-[#0e0d0c]">
          <div>
            <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
                <Calculator size={15} /> Interactive Perp ↔ Share Converter
              </div>
              <button
                type="button"
                onClick={() => setCustomPerpVal(null)}
                className="text-[10px] font-mono text-zinc-400 hover:text-[#da7756] underline"
              >
                Reset to Live (${price.toFixed(1)})
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-mono uppercase text-zinc-400">io:ANTH Index / Implied FDV ($B)</span>
                  <span className="font-mono font-bold text-[#da7756] tabular">
                    ${activePerpVal.toFixed(1)} (${(activePerpVal / 1000).toFixed(3)}T)
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={2800}
                  step={5}
                  value={activePerpVal}
                  onChange={(e) => setCustomPerpVal(Number(e.target.value))}
                  className="w-full accent-[#da7756]"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>$1,337 ($74/sh)</span>
                  <span>$1,500 ($83 IPO)</span>
                  <span>$1,812 (Live)</span>
                  <span>$2,500 ($138/sh)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                  <div className="text-[10px] font-mono uppercase text-zinc-500">Implied ANT Share Price</div>
                  <div className="mt-1 text-2xl font-bold font-mono text-emerald-400 tabular">
                    ${activeSharePx.toFixed(2)}
                  </div>
                  <div className="mt-0.5 text-[10px] font-mono text-zinc-400">
                    at 18.07B FD shares
                  </div>
                </div>

                <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                  <div className="text-[10px] font-mono uppercase text-zinc-500">Pop vs. $83.00 IPO</div>
                  <div className={`mt-1 text-2xl font-bold font-mono tabular ${activePopVs83 >= 0 ? "text-[#da7756]" : "text-red-400"}`}>
                    {activePopVs83 >= 0 ? "+" : ""}{activePopVs83.toFixed(1)}%
                  </div>
                  <div className="mt-0.5 text-[10px] font-mono text-zinc-400">
                    ({activePopVs74 >= 0 ? "+" : ""}{activePopVs74.toFixed(1)}% vs $74 S-1/A mid)
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#262321] bg-[#12100f] p-3 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Basic Market Cap (13.23B sh):</span>
                  <span className="font-mono text-zinc-200 tabular">${(activeBasicCapB / 1000).toFixed(3)} Trillion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Fully Diluted Cap (18.07B sh):</span>
                  <span className="font-mono text-zinc-200 tabular">${(activePerpVal / 1000).toFixed(3)} Trillion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">EV / Oct 2026 ARR ($81B):</span>
                  <span className="font-mono text-[#da7756] tabular">{(activePerpVal / 81.0).toFixed(1)}× ARR</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">{children}</div>
  );
}
