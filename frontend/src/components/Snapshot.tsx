import { Section, Card, Stat } from "./Section";
import { data, SEC_URL } from "../data";
import { Shield, DollarSign, Award } from "lucide-react";

export function Snapshot() {
  const f = data.financials.summary;

  return (
    <Section
      id="snapshot"
      eyebrow="Section 01 · Form 424(b)(4) Final Prospectus Summary"
      title="The $83.00/sh ($1.51T FDV) IPO at a Glance"
      blurb="Key numbers from Anthropic, PBC's final Form 424(b)(4) prospectus (filed Nov 19, 2026 after pricing at $83.00/sh on Nov 18) and the Pricing Term Sheet FWP."
      sourceUrl={SEC_URL}
      sourceLabel="SEC Form 424(b)(4) · CIK 0002130357"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#da7756]">
          <Stat
            label="IPO Pricing Valuation ($83/sh)"
            value="$1.51 Trillion"
            accent="text-[#da7756]"
            sub="18.14B FD shares · $1.10T Basic (13.22B Class A + N shares)"
          />
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <Stat
            label="9M'26 Revenue & Oct Run-Rate"
            value={`$${f.nine_month_2026_revenue_usd_billions}B`}
            accent="text-emerald-400"
            sub={`$16.95B Q3'26 (+383% YoY) · $81B Oct '26 annualized run-rate`}
          />
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <Stat
            label="Compute Commitments"
            value={`$${f.total_compute_commitments_usd_billions}B`}
            accent="text-amber-400"
            sub={`$${f.noncancelable_compute_minimums_usd_billions}B non-cancelable minimums through 2038`}
          />
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <Stat
            label="Total Net Proceeds Raised"
            value="$104.8B"
            accent="text-cyan-400"
            sub="$78.8B Primary IPO + $26.0B Class N Private ($117.0B w/ shoe)"
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <DollarSign size={14} /> Pro Forma Balance Sheet & Earnings
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Pro Forma Cash & Investments</span>
              <span className="font-semibold text-emerald-400 tabular">$232.35 Billion</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">9M'26 Adj. Operating Income</span>
              <span className="font-semibold text-emerald-400 tabular">+$4.08 Billion</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">9M'26 Operating Cash Flow</span>
              <span className="font-semibold text-emerald-400 tabular">+$6.57 Billion</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">9M'26 GAAP Net Loss</span>
              <span className="font-semibold text-zinc-300 tabular">-$104.04 Billion*</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              *Includes -$94.32B in non-cash convertible note fair-value remeasurements and $6.83B in RSU IPO-vesting SBC; all $105.7B of convertible notes extinguished at IPO closing.
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Shield size={14} /> 5-Class Capital & Governance
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class A (7.58B sh · ANT)</span>
              <span className="font-semibold text-zinc-100">1 vote/sh (49.9% total)</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class F (Founder LLC · 1 sh)</span>
              <span className="font-semibold text-amber-400">50.1% general voting power</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class T (Safety Trust · 1 sh)</span>
              <span className="font-semibold text-[#da7756]">Elects 4 of 7 Directors</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Class N (5.64B sh · Strategic)</span>
              <span className="font-semibold text-zinc-100">Non-voting economic</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              Includes 846.8M Class N shares (~$70.3B at $83/sh) issued to the Anthropic Public Benefit Fund, unlocking in 8 tranches starting once ANT trades ≥$124.50 (+50%).
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
            <Award size={14} /> Commercial Velocity (9M'26)
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Consumption vs. Sub</span>
              <span className="font-semibold text-zinc-100">76.5% API · 23.5% Sub</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Cloud Partner Marketplaces</span>
              <span className="font-semibold text-zinc-100">43% of 9M'26 ($14.23B)</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">&gt;$100K Run-Rate Customers</span>
              <span className="font-semibold text-emerald-400 tabular">11,900+ (+467% YoY)</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Revenue per Employee</span>
              <span className="font-semibold text-zinc-100">&gt;$6.6M (5,400 staff)</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              Claude Code, Claude Cowork, and 1M-context Claude 4.5/4.6 Opus & Sonnet drove Q3'26 revenue to $16.95B (+46.7% QoQ) and Oct '26 run-rate to $81B.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
