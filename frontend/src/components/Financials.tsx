import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Section, Card, Stat, SourceLink } from "./Section";
import { data, fmtUSD } from "../data";
import { TrendingUp, AlertTriangle, PieChart, DollarSign, Cpu } from "lucide-react";

export function Financials() {
  const fin = data.financials;
  const annual = fin.annual;
  const opEx = fin.operating_expenses_2025;

  const chartData = annual.map((a) => ({
    year: a.year.toString(),
    revenue: a.revenue,
    grossMargin: a.gross_margin_pct,
  }));

  return (
    <Section
      id="financials"
      eyebrow="Section 03 · Financial Statements"
      title="Financial Performance & Unit Economics"
      blurb="Primary-source statement of operations: Anthropic's dramatic 12× revenue explosion from $100M in 2023 to $4.62B in 2025, rapid gross margin expansion to 58%, and the anatomy of its accounting net loss."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Selected Financial Data"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Revenue Chart */}
        <Card className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <TrendingUp size={14} className="text-emerald-400" /> Annual Revenue Trajectory ($M)
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              +1,180% YoY
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#262321" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#716b67" fontSize={11} />
                <YAxis stroke="#716b67" fontSize={11} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    background: "#161413",
                    border: "1px solid #38332f",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => [`$${v.toLocaleString()}M`, "Revenue"]}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === chartData.length - 1 ? "#da7756" : "#716b67"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 pt-4 border-t border-[#262321] text-center text-xs">
            <div>
              <div className="text-zinc-500 font-mono">2022</div>
              <div className="font-semibold text-zinc-200 mt-0.5">$10M</div>
              <div className="text-[10px] text-red-400 font-mono">-150% GM</div>
            </div>
            <div>
              <div className="text-zinc-500 font-mono">2023</div>
              <div className="font-semibold text-zinc-200 mt-0.5">$100M</div>
              <div className="text-[10px] text-red-400 font-mono">-25% GM</div>
            </div>
            <div>
              <div className="text-zinc-500 font-mono">2024</div>
              <div className="font-semibold text-zinc-200 mt-0.5">$1,050M</div>
              <div className="text-[10px] text-emerald-400 font-mono">+42% GM</div>
            </div>
            <div>
              <div className="text-[#da7756] font-mono font-medium">2025</div>
              <div className="font-semibold text-[#da7756] mt-0.5">$4,620M</div>
              <div className="text-[10px] text-emerald-400 font-mono">+58% GM</div>
            </div>
          </div>
        </Card>

        {/* Operating Costs */}
        <Card className="lg:col-span-4">
          <div className="text-xs font-mono uppercase text-zinc-400 mb-3 flex items-center gap-2">
            <PieChart size={14} className="text-[#da7756]" /> 2025 Operating Costs ($10.9B total)
          </div>
          <div className="space-y-3">
            {opEx.map((cost, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300">{cost.category}</span>
                  <span className="font-mono text-zinc-200 tabular font-semibold">
                    ${(cost.amount_millions / 1000).toFixed(2)}B ({cost.pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#da7756] to-amber-500 rounded-full"
                    style={{ width: `${cost.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-[#2a2624] bg-[#12100f] p-3 text-xs text-zinc-400">
            <div className="font-medium text-zinc-200 flex items-center gap-1">
              <Cpu size={13} className="text-amber-400" /> Compute & Training Intensity
            </div>
            <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">
              Compute and cloud hosting represents 62.8% of cash operating expenditures, reflecting massive training runs for frontier models like Claude 3.5 Sonnet and next-generation reasoning clusters.
            </p>
          </div>
        </Card>
      </div>

      {/* The $42.1B Accounting Net Loss Card */}
      <div className="mt-6">
        <Card className="border-l-4 border-l-amber-500 bg-[#161412]">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-zinc-100 text-sm">
                Demystifying the $42.1 Billion Accounting Net Loss
              </h4>
              <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                Headlines may cite a staggering <span className="text-red-400 font-medium">-$42.1B net loss</span> in 2025. However, the S-1 notes that{" "}
                <span className="text-amber-400 font-medium">$33.86 billion</span> of this is a purely non-cash, mark-to-market accounting charge required under GAAP. Because Anthropic's valuation increased dramatically between funding rounds, the fair-value liability of convertible notes issued to earlier investors (Amazon, Google, venture backers) expanded. Upon the IPO, all convertible instruments extinguish into equity, permanently eliminating this charge from GAAP earnings.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
