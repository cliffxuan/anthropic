import { Section, Card } from "./Section";
import { data } from "../data";
import { Shield, Users, Award, Lock, Scale, HeartHandshake } from "lucide-react";

export function Governance() {
  const gov = data.governance;
  const ltbt = gov.long_term_benefit_trust;

  return (
    <Section
      id="governance"
      eyebrow="Section 07 · Governance & Purpose"
      title="The Long-Term Benefit Trust Architecture"
      blurb="Anthropic is structured as a Delaware Public Benefit Corporation governed by an independent purpose trust designed to safeguard humanity as frontier AI capabilities scale."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Management & Governance"
    >
      <div className="grid gap-6 lg:grid-cols-12 mb-8">
        {/* The LTBT Card */}
        <Card className="lg:col-span-7 border-l-4 border-l-[#da7756] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <Shield size={16} /> The Long-Term Benefit Trust (LTBT)
          </div>
          <h3 className="text-xl font-bold text-zinc-100">
            A Fiduciary Anchor for AI Safety
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            The Trust holds a single, non-economic <span className="text-[#da7756] font-semibold">Class T Share</span>. Unlike traditional corporate boards beholden solely to short-term shareholder returns, the Trustees have a legal duty to promote Anthropic's public benefit purpose: <em>"To responsibly develop and maintain advanced artificial intelligence for the long-term benefit of humanity."</em>
          </p>

          <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-4 text-xs space-y-2">
            <div className="font-semibold text-zinc-200">Trustee Board Election Rights:</div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              {ltbt.authority}
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-2">Independent Trustees</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ltbt.trustees.map((t, i) => (
                <div key={i} className="rounded-lg border border-[#262321] bg-[#141211] p-2 text-zinc-300">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* PBC Fiduciary Duties */}
        <Card className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Scale size={16} /> Delaware PBC Legal Mechanics
          </div>
          <h3 className="text-lg font-bold text-zinc-100">
            Balancing Three Fiduciary Pillars
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Delaware General Corporation Law § 362 requires directors to balance three distinct interests:
          </p>
          <div className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-emerald-400">1. Shareholder Pecuniary Value</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">Commercial execution and sustainable business margins.</p>
            </div>
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-[#da7756]">2. The Public Benefit Mandate</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">Responsible AI stewardship, alignment research, and societal benefit.</p>
            </div>
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-cyan-400">3. Materially Affected Stakeholders</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">Global public safety, scientific researchers, and downstream developers.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leadership Team */}
      <div>
        <h3 className="text-base font-semibold text-zinc-200 mb-4 font-mono uppercase text-xs tracking-wider">
          Executive Leadership Team
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gov.leadership.map((l, i) => (
            <Card key={i} className="p-4">
              <div className="font-semibold text-zinc-100 text-sm">{l.name}</div>
              <div className="text-xs font-mono text-[#da7756] mt-0.5">{l.role}</div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{l.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
