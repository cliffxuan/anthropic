import { type ReactNode } from "react";
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
import { Section, Card, Stat, SourceLink } from "./Section";
import { usePrices } from "../usePrices";
import { Activity, TrendingUp, TrendingDown, DollarSign, Layers, ExternalLink } from "lucide-react";

const HL_URL = "https://app.hyperliquid.xyz/trade/io:ANTH";

export function PriceTracker() {
  const { data: d, err } = usePrices();

  const price = d?.latest.price ?? 2041.5;
  const prevClose = d?.latest.prev_close ?? 2041.5;
  const dayChange = d?.latest.day_change_pct ?? 0.0;
  const isUp = dayChange >= 0;
  const impliedCapT = d?.latest.implied_valuation_t ?? 2.04;
  const vsSeriesH = d?.latest.vs_series_h_pct ?? 111.5;
  const seriesH = d?.series_h_valuation_t ? d.series_h_valuation_t * 1000 : 965;
  const target = d?.target_valuation_t ? d.target_valuation_t * 1000 : 2000;

  return (
    <Section
      id="market"
      eyebrow="Live · Pre-IPO Derivative Market"
      title="io:ANTH · Live on Hyperliquid"
      blurb="Real-time daily close series for the Hyperliquid io:ANTH pre-IPO perpetual contract. 1 point corresponds to $1 Billion of implied Anthropic equity valuation. The market prices Anthropic at ~$2.04 Trillion, up +111% from its May 2026 Series H ($965B)."
      sourceUrl={HL_URL}
      sourceLabel="Hyperliquid · io:ANTH"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <Activity size={14} className="text-[#da7756]" /> Daily Close · Implied Valuation ($B)
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
                      `$${v.toFixed(1)} ($${(v / 1000).toFixed(3)}T cap)`,
                      "io:ANTH Perp",
                    ]}
                  />
                  <ReferenceLine
                    y={target}
                    stroke="#da7756"
                    strokeDasharray="4 4"
                    label={{
                      value: `Target IPO: $${target} ($2.0T)`,
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
                      value: `Series H: $${seriesH} ($965B)`,
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
              <span className="h-0.5 w-4 rounded border-t border-dashed border-[#da7756]" /> $2.0T Target IPO reference
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
              label="io:ANTH · Live Price"
              value={`$${price.toFixed(2)}`}
              accent="text-[#da7756]"
              sub={
                <span className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                    {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {isUp ? "+" : ""}{dayChange.toFixed(2)}% today
                  </span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-400">prior ${prevClose.toFixed(2)}</span>
                </span>
              }
            />
          </Card>

          <Card>
            <Stat
              label="Implied Valuation"
              value={`$${impliedCapT.toFixed(3)}T`}
              accent="text-zinc-100"
              sub={
                <span className="text-xs text-emerald-400 font-medium">
                  +{vsSeriesH.toFixed(1)}% above $965B Series H
                </span>
              }
            />
          </Card>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211] p-4 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center justify-between text-zinc-300 font-medium">
              <span>Contract Specification</span>
              <span className="font-mono text-[#da7756]">HIP-3 Builder</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Underlying Index</span>
              <span>1 pt = $1.0 Billion valuation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Collateral Asset</span>
              <span>USDC (Cross-margin)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Settlement</span>
              <span>Cash settled against oracle</span>
            </div>
          </div>

          <a
            href={HL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#da7756] py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
          >
            <TrendingUp size={16} /> Trade io:ANTH on Hyperliquid <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </Section>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">{children}</div>
  );
}
