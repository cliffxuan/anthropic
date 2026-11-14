import { Section, Card } from "./Section";
import { data } from "../data";
import { Shield, Scale, Users } from "lucide-react";

export function Governance() {
  const gov = data.governance;
  const ltbt = gov.long_term_benefit_trust;

  return (
    <Section
      id="governance"
      eyebrow="Section 07 · Governance & Purpose"
      title="The 5-Class Capital & Long-Term Benefit Trust Architecture"
      blurb="Anthropic's S-1 unveils a novel governance design separating economic ownership from safety oversight: the independent Long-Term Benefit Trust appoints 4 of 7 Board Directors via Class T, while Founder LLC holds 50.1% stockholder voting power via Class F."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Management & Corporate Governance"
    >
      <div className="grid gap-6 lg:grid-cols-12 mb-8">
        {/* The LTBT Card */}
        <Card className="lg:col-span-7 border-l-4 border-l-[#da7756] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <Shield size={16} /> The Long-Term Benefit Trust (Class T · 4 of 7 Board Seats)
          </div>
          <h3 className="text-xl font-bold text-zinc-100">
            An Independent Board Majority for AI Safety
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            The Trust holds all shares of non-economic <span className="text-[#da7756] font-semibold">Class T Common Stock</span>, qualifying Anthropic as a "controlled company" under Nasdaq rules. Through Class T, financially disinterested Trustees elect and remove <span className="text-zinc-100 font-semibold">four of Anthropic's seven Board Directors</span> to uphold its PBC charter: <em>"To responsibly develop and maintain advanced artificial intelligence for the long-term benefit of humanity."</em>
          </p>

          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-2">Independent LTBT Trustees</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ltbt.trustees.map((t, i) => (
                <div key={i} className="rounded-lg border border-[#262321] bg-[#141211] p-2.5 text-zinc-300">
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-2">Post-IPO Board of Directors (7 Authorized Seats)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ltbt.board_directors.map((d, i) => (
                <div key={i} className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5 text-zinc-300">
                  {d}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* PBC Fiduciary Duties & Voting Power */}
        <Card className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Scale size={16} /> Dual-Layer Control & PBC Duties
          </div>
          <h3 className="text-lg font-bold text-zinc-100">
            How Stockholder & Board Control Interact
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The S-1 establishes two distinct layers of governance protection alongside Delaware PBC law (§ 362):
          </p>
          <div className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-[#da7756]">1. Board Majority (Class T · LTBT)</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                The LTBT appoints 4 of 7 directors (Reed Hastings, Vas Narasimhan, Christopher Liddell + 1 seat), governing executive oversight and Responsible Scaling Policy (RSP) enforcement.
              </p>
            </div>
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-amber-400">2. Stockholder Majority (Class F · 50.1%)</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Founder LLC (representing the 7 co-founders led by Dario & Daniela Amodei) holds 50.1% of general voting power via Class F, while public Class A shares are capped at 49.9%.
              </p>
            </div>
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-emerald-400">3. Non-Voting Strategic Capital (Class N)</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Hyperscaler and silicon partners (Google, Amazon, Nvidia, Microsoft) hold economic Class N shares with zero voting rights, preventing cloud supplier capture.
              </p>
            </div>
            <div className="rounded-lg border border-[#262321] bg-[#12100f] p-2.5">
              <span className="font-semibold text-cyan-400">4. Institutional Governance Debate</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                While pension funds have scrutinized the separation of economic risk from voting power, Anthropic defends the structure as essential to prevent short-term profit pressures from compromising frontier AI safety.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leadership Team */}
      <div>
        <h3 className="text-base font-semibold text-zinc-200 mb-4 font-mono uppercase text-xs tracking-wider flex items-center gap-2">
          <Users size={14} className="text-[#da7756]" /> Executive Leadership Team
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
