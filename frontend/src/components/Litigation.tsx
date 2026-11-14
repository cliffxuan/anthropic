import { Section, Card } from "./Section";
import { Scale, ShieldAlert, CheckCircle2 } from "lucide-react";

export function Litigation() {
  return (
    <Section
      id="litigation"
      eyebrow="Section 09 · Legal & Regulatory Proceedings"
      title="Copyright Settlements, Music Litigation & Pentagon Standoff"
      blurb="Key legal disclosures from the Form S-1: the final approval of the historic $1.5B Bartz book-author settlement, pending summary judgment in the Concord/UMG music publisher suits, and federal litigation over the Pentagon's 'supply chain risk' designation."
      sourceUrl="https://www.sec.gov/edgar/browse/?CIK=0002130357"
      sourceLabel="S-1 · Legal Proceedings"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-l-4 border-l-emerald-500 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
            <CheckCircle2 size={16} /> Bartz v. Anthropic ($1.5B Settlement)
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            Final Court Approval Granted (July 20, 2026)
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            In August 2025, Anthropic agreed to a <span className="text-zinc-100 font-medium">$1.5 billion class-action settlement</span>—the largest copyright recovery in U.S. history—averaging ~$3,000 per work across ~500,000 books ingested from shadow libraries (LibGen/PiLiMi), after the court held that training on lawfully purchased physical books was transformative fair use.
          </p>
          <div className="rounded-lg border border-[#2a2624] bg-[#12100f] p-3 text-xs space-y-1.5">
            <div className="font-semibold text-zinc-200">Status (Q4 2026):</div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Judge Araceli Martínez-Olguín (N.D. Cal.) entered final judgment on July 20, 2026. Over 91% of eligible works were claimed, with JND Legal Administration rolling out initial distributions in late 2026.
            </p>
          </div>
        </Card>

        <Card className="border-l-4 border-l-amber-500 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Scale size={16} /> Music Publishers v. Anthropic
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            Concord I & II, UMG, Sony & Warner (N.D. Cal.)
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Major music publishers are prosecuting dual lawsuits before Judge Rita Lin: <em>Concord I</em> (alleging lyric regurgitation and CMI removal) and <em>Concord II</em> (filed Jan 2026, alleging shadow-library torrenting of copyrighted sheet music and lyrics, joined by Sony, Warner Chappell, and BMG).
          </p>
          <div className="rounded-lg border border-[#2a2624] bg-[#12100f] p-3 text-xs space-y-1.5">
            <div className="font-semibold text-zinc-200">S-1 Warning & Oct 21 Hearing:</div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Summary judgment motions were argued on October 21, 2026. The S-1 warns that an adverse ruling could force Anthropic to pay substantial damages or <span className="text-amber-400 font-medium">retrain foundational models from scratch</span>.
            </p>
          </div>
        </Card>

        <Card className="border-l-4 border-l-red-500 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400">
            <ShieldAlert size={16} /> Pentagon & Federal Standoff
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            DoD 'Supply Chain Risk' Designation (2026)
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            In early 2026, Anthropic refused Pentagon demands to waive two core Acceptable Use Policy guardrails: prohibitions against <span className="text-zinc-100 font-medium">mass domestic surveillance</span> and <span className="text-zinc-100 font-medium">fully autonomous lethal weapons systems</span>.
          </p>
          <div className="rounded-lg border border-[#2a2624] bg-[#12100f] p-3 text-xs space-y-1.5">
            <div className="font-semibold text-zinc-200">Federal Ban & Constitutional Suit:</div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              The DoD designated Anthropic a "supply chain risk"—giving military contractors 180 days to purge Claude—and federal agencies were ordered to halt usage. Anthropic is challenging the designation in federal court.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
