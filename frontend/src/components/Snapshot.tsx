import { Section, Card, Stat } from "./Section";
import { data } from "../data";
import { Shield, DollarSign, Award } from "lucide-react";

export function Snapshot() {
  const ipo = data.ipo;
  const f = data.financials.summary;

  return (
    <Section
      id="snapshot"
      eyebrow="Section 01 · Final Prospectus Summary"
      title="The $83.00 / Share IPO at a glance"
      blurb="Key numbers from Anthropic PBC's final IPO pricing on November 18, 2026 ($83.00/share across 980M Class A shares, above the $70–$78 range) and public Form S-1 financial disclosures."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="SEC Form 424(b)(4) (CIK 0002130357)"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#da7756]">
          <Stat
            label="Final IPO Valuation ($83/sh)"
            value="$1.50 Trillion"
            accent="text-[#da7756]"
            sub="Priced at $83.00/sh (above $70–$78 range · ~$1.10T basic cap)"
          />
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <Stat
            label="9M 2026 Revenue & ARR"
            value={`$${f.nine_month_2026_revenue_usd_billions}B`}
            accent="text-emerald-400"
            sub={`$81B Oct 2026 ARR · $16.95B in Q3 2026 · $4.59B in FY25`}
          />
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <Stat
            label="Compute Commitments"
            value={`Up to $${f.total_compute_commitments_usd_billions}B`}
            accent="text-amber-400"
            sub={`$${f.noncancelable_compute_minimums_usd_billions}B non-cancelable minimums (Google, AWS, MSFT)`}
          />
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <Stat
            label="Total IPO + Private Raise"
            value={`$${ipo.total_capital_raise_usd_billions}B`}
            accent="text-cyan-400"
            sub={`$81.34B IPO (980M sh) + $26B Class N ($83/sh · Largest IPO ever)`}
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <DollarSign size={14} /> Balance Sheet & Profitability
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Pre-IPO Cash & Sec.</span>
              <span className="font-semibold text-zinc-100 tabular">$131.7 Billion</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Q2 2026 Operating Profit</span>
              <span className="font-semibold text-emerald-400 tabular">+$974 Million</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">9M 2026 Operating Cash Flow</span>
              <span className="font-semibold text-emerald-400 tabular">+$6.6 Billion</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">H1 2026 GAAP Net Loss</span>
              <span className="font-semibold text-zinc-300 tabular">-$80.75 Billion*</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              *Over $72B of H1 2026 GAAP net loss (and $33.9B of FY25's -$42.0B net loss) stems from non-cash fair-value markups on convertible notes & SAFEs.
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Shield size={14} /> 5-Class Capital & Governance
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class A (Public · ANT)</span>
              <span className="font-semibold text-zinc-100">1 vote/sh (capped 49.9%)</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class F (Founder LLC)</span>
              <span className="font-semibold text-amber-400">50.1% general voting power</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class T (Safety Trust)</span>
              <span className="font-semibold text-[#da7756]">Elects 4 of 7 Directors</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Class N (Strategic)</span>
              <span className="font-semibold text-zinc-100">Non-voting economic</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              The Long-Term Benefit Trust appoints a 4-seat board majority (Reed Hastings, Vas Narasimhan, Chris Liddell), while Founder LLC holds 50.1% stockholder voting control.
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
            <Award size={14} /> Commercial Traction
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Consumption vs. Sub</span>
              <span className="font-semibold text-zinc-100">80.2% API · 19.8% Sub</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">CSP Marketplaces</span>
              <span className="font-semibold text-zinc-100">48% of H1 26 ($7.8B)</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">&gt;$100K ARR Customers</span>
              <span className="font-semibold text-emerald-400 tabular">11,900+ enterprises</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Frontier Model Suite</span>
              <span className="font-semibold text-zinc-100">Claude 5.5 & Mythos 5.2</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              Claude Code, Claude Cowork desktop agents, and 1M-context Claude 5.5 models drive explosive enterprise expansion with no customer &gt;10% of revenue.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
