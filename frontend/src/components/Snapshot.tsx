import { Section, Card, Stat, SourceLink } from "./Section";
import { data, fmtUSD, fmtDate } from "../data";
import { CheckCircle2, AlertCircle, Cpu, Shield, DollarSign, Users, Award, TrendingUp } from "lucide-react";

export function Snapshot() {
  const ipo = data.ipo;
  const f = data.financials.summary;

  return (
    <Section
      id="snapshot"
      eyebrow="Section 01 · S-1 Executive Summary"
      title="The Prospectus at a glance"
      blurb="Key numbers from the confidential Form S-1 draft registration statement submitted to the SEC on June 1, 2026, paired with verified capitalization filings."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="SEC Form S-1 (Confidential DRS)"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#da7756]">
          <Stat
            label="Target IPO Valuation"
            value="~$2.0 Trillion"
            accent="text-[#da7756]"
            sub="Aiming for historic public debut; normalized target ~$200/share"
          />
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <Stat
            label="2025 Revenue"
            value={`$${f.fy2025_revenue_usd_billions}B`}
            accent="text-emerald-400"
            sub={`+${f.fy2025_yoy_growth_pct}% YoY from $1.05B in 2024`}
          />
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <Stat
            label="Compute Obligations"
            value={`$${f.total_compute_commitments_usd_billions}B`}
            accent="text-amber-400"
            sub="10-year commitments across AWS Trainium & Google TPUs"
          />
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <Stat
            label="Series H Post-Money"
            value={`$${ipo.series_h.post_money_valuation_usd_billions}B`}
            accent="text-cyan-400"
            sub={`Raised $${ipo.series_h.amount_raised_usd_billions}B in May 2026`}
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <DollarSign size={14} /> Balance Sheet & Cash
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Cash & Equivalents</span>
              <span className="font-semibold text-zinc-100 tabular">$14.2 Billion</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Gross Margin (2025)</span>
              <span className="font-semibold text-emerald-400 tabular">58.0%</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Operating Loss (2025)</span>
              <span className="font-semibold text-red-400 tabular">-$8.24 Billion</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Accounting Net Loss</span>
              <span className="font-semibold text-zinc-300 tabular">-$42.1 Billion*</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              *$33.86B of the 2025 accounting net loss is a non-cash mark-to-market charge on convertible notes due to valuation markup.
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Shield size={14} /> Structure & Governance
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Corporate Form</span>
              <span className="font-semibold text-zinc-100">Delaware PBC</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class A (Public)</span>
              <span className="font-semibold text-zinc-100">1 vote / share</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Class B (Insiders)</span>
              <span className="font-semibold text-zinc-100">10 votes / share</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Class T (Safety Trust)</span>
              <span className="font-semibold text-[#da7756]">Long-Term Benefit Trust</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              The Long-Term Benefit Trust (LTBT) holds veto and director appointment rights tied to frontier model safety thresholds.
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
            <Award size={14} /> Commercial Traction
          </div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Direct API Share</span>
              <span className="font-semibold text-zinc-100">42% of revenue</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Hyperscaler Alliances</span>
              <span className="font-semibold text-zinc-100">36% (AWS & GCP)</span>
            </div>
            <div className="flex justify-between border-b border-[#262321] pb-2">
              <span className="text-zinc-400">Net Revenue Retention</span>
              <span className="font-semibold text-emerald-400 tabular">172% NRR</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">Enterprise Customers</span>
              <span className="font-semibold text-zinc-100">35,000+ businesses</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              Proprietary coding agent workflows (Claude Code) and Computer Use API drive industry-leading retention among Fortune 500 engineering teams.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
