import { Section, Card } from "./Section";
import { data } from "../data";

export function Customers() {
  const customers = data.customers;

  return (
    <Section
      id="customers"
      eyebrow="Section 06 · Enterprise Distribution"
      title="Trusted by Global Enterprises"
      blurb="Nearly 12,000 enterprise customers spend over $100,000+ annually on Claude, driving an $81B annualized run-rate with top enterprise cohorts exceeding 900% Net Revenue Retention and zero single-customer concentration above 10%."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Business · Customers"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">&gt;$100K ARR Customers</div>
          <div className="mt-1 text-3xl font-bold text-zinc-100 tabular">11,900+</div>
          <div className="mt-1 text-xs text-zinc-400">Disclosed in Form S-1/A</div>
        </Card>
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">Top Cohort Expansion</div>
          <div className="mt-1 text-3xl font-bold text-emerald-400 tabular">~900%</div>
          <div className="mt-1 text-xs text-zinc-400">Enterprise NRR via API & Code</div>
        </Card>
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">CSP Marketplace Share</div>
          <div className="mt-1 text-3xl font-bold text-[#da7756] tabular">48%</div>
          <div className="mt-1 text-xs text-zinc-400">$7.8B H1 26 via AWS & GCP</div>
        </Card>
        <Card className="text-center p-5">
          <div className="text-xs font-mono uppercase text-zinc-500">Customer Diversification</div>
          <div className="mt-1 text-3xl font-bold text-cyan-400 tabular">&lt;10%</div>
          <div className="mt-1 text-xs text-zinc-400">Max Single Customer (Top 5 = 25%)</div>
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
