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
import { Section, Card } from "./Section";
import { data, SEC_URL } from "../data";
import { TrendingUp, AlertTriangle, PieChart, Cpu } from "lucide-react";

export function Financials() {
  const fin = data.financials;
  const quarterly = fin.quarterly_2025_2026;
  const opEx = fin.operating_expenses_2025;

  const chartData = quarterly.map((q) => ({
    period: q.quarter,
    revenue: q.revenue_millions,
  }));

  return (
    <Section
      id="financials"
      eyebrow="Section 03 · Form 424(b)(4) Financial Statements"
      title="Financial Performance & Unit Economics"
      blurb="Primary-source Form 424(b)(4) disclosures: Anthropic's revenue explosion from $41M in 2023 to $386M in 2024, $4.585B in 2025, and $33.24B in the first nine months of 2026 ($81B Oct '26 run-rate)—delivering +$974M Q2 GAAP operating profit, +$4.08B 9M'26 Adjusted Operating Income, and +$6.57B operating cash flow."
      sourceUrl={SEC_URL}
      sourceLabel="Form 424(b)(4) · Consolidated Financial Statements"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Quarterly Revenue Chart */}
        <Card className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <TrendingUp size={14} className="text-emerald-400" /> Quarterly Revenue Surge ($M · Q1 2025 – Q3 2026)
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              $81B Oct 2026 Run-Rate
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                <CartesianGrid stroke="#262321" strokeDasharray="3 3" />
                <XAxis dataKey="period" stroke="#716b67" fontSize={11} />
                <YAxis
                  stroke="#716b67"
                  fontSize={11}
                  tickFormatter={(v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}B` : `$${v}M`)}
                />
                <Tooltip
                  contentStyle={{
                    background: "#161413",
                    border: "1px solid #38332f",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => [`$${v.toLocaleString()}M ($${(v / 1000).toFixed(2)}B)`, "Quarterly Revenue"]}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index >= 4 ? "#da7756" : "#716b67"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 pt-4 border-t border-[#262321] text-center text-xs">
            <div>
              <div className="text-zinc-500 font-mono">FY 2023</div>
              <div className="font-semibold text-zinc-200 mt-0.5">$41M</div>
              <div className="text-[10px] text-red-400 font-mono">-$551M Op. Loss</div>
            </div>
            <div>
              <div className="text-zinc-500 font-mono">FY 2024</div>
              <div className="font-semibold text-zinc-200 mt-0.5">$386M</div>
              <div className="text-[10px] text-red-400 font-mono">-$2.98B Op. Loss</div>
            </div>
            <div>
              <div className="text-zinc-400 font-mono">FY 2025</div>
              <div className="font-semibold text-zinc-200 mt-0.5">$4,585M</div>
              <div className="text-[10px] text-amber-400 font-mono">-$8.06B Op. Loss</div>
            </div>
            <div>
              <div className="text-[#da7756] font-mono font-medium">9M 2026</div>
              <div className="font-semibold text-[#da7756] mt-0.5">$33,240M</div>
              <div className="text-[10px] text-emerald-400 font-mono">+$4.08B Adj. Op. Inc.</div>
            </div>
          </div>
        </Card>

        {/* Operating Costs */}
        <Card className="lg:col-span-4">
          <div className="text-xs font-mono uppercase text-zinc-400 mb-3 flex items-center gap-2">
            <PieChart size={14} className="text-[#da7756]" /> FY 2025 Functional Costs ($12.65B)
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
              <Cpu size={13} className="text-amber-400" /> 9M 2026 Non-GAAP Profitability
            </div>
            <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">
              In 9M 2026, revenue reached $33.24B (56.2% GAAP gross margin; $18.67B gross profit). Excluding $6.83B in IPO-triggered RSU stock-based compensation, Anthropic generated +$4.08B in Adjusted Operating Income, +$5.59B in Adjusted Net Income, and +$6.57B in operating cash flow.
            </p>
          </div>
        </Card>
      </div>

      {/* The Accounting Net Loss Card */}
      <div className="mt-6">
        <Card className="border-l-4 border-l-amber-500 bg-[#161412]">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-zinc-100 text-sm">
                Demystifying the -$41.97B (FY25) and -$104.04B (9M 2026) GAAP Net Losses
              </h4>
              <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                Form 424(b)(4) reports GAAP net losses of <span className="text-red-400 font-medium">-$41.97B in FY2025</span> and{" "}
                <span className="text-red-400 font-medium">-$104.04B in 9M 2026</span>. Of that 9M 2026 GAAP loss,{" "}
                <span className="text-amber-400 font-medium">-$94.32B (90.7%)</span> is a non-cash fair-value remeasurement charge on convertible notes and derivative liabilities triggered by Anthropic's valuation surge to $1.51T, and{" "}
                <span className="text-amber-400 font-medium">$6.83B</span> is cumulative stock-based compensation recognized on RSUs whose performance condition vested at the IPO. At IPO closing, all $105.7B of convertible notes converted into 2.096B common shares, permanently eliminating these remeasurement charges.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
