import { Section, Card, Stat } from "./Section";
import { data } from "../data";
import { Users, Building, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";

export function Customers() {
  const customers = data.customers;

  return (
    <Section
      id="customers"
      eyebrow="Section 06 · Enterprise Distribution"
      title="Trusted by Global Enterprises"
      blurb="From tier-1 biopharma to quantitative hedge funds and cloud giants, Anthropic models power core operations for over 35,000 organizations with 172% Net Revenue Retention."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Business · Customers"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">Commercial Clients</div>
          <div className="mt-1 text-3xl font-bold text-zinc-100 tabular">35,000+</div>
          <div className="mt-1 text-xs text-zinc-400">Enterprises & Startups</div>
        </Card>
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">Net Revenue Retention</div>
          <div className="mt-1 text-3xl font-bold text-emerald-400 tabular">172%</div>
          <div className="mt-1 text-xs text-zinc-400">Enterprise Cohort NRR</div>
        </Card>
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">Fortune 500 Adoption</div>
          <div className="mt-1 text-3xl font-bold text-[#da7756] tabular">&gt;68%</div>
          <div className="mt-1 text-xs text-zinc-400">Using Claude via Cloud APIs</div>
        </Card>
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">Coding Productivity</div>
          <div className="mt-1 text-3xl font-bold text-cyan-400 tabular">4.2×</div>
          <div className="mt-1 text-xs text-zinc-400">Dev Velocity via Claude Code</div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {customers.map((c, i) => (
          <Card key={i} className="hover:border-[#da7756]/40 transition group">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-100 text-sm">{c.name}</span>
              <span className="rounded-full border border-[#2e2a27] bg-[#1a1715] px-2 py-0.5 text-[10px] font-mono text-[#da7756]">
                {c.tier}
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {c.use_case}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
