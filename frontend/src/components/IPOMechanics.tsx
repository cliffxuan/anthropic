import { Section, Card } from "./Section";
import { data } from "../data";
import { Tag, Vote, Shield, Lock, Landmark, Scale } from "lucide-react";

export function IPOMechanics() {
  return (
    <Section
      id="ipo"
      eyebrow="Section 02 · S-1/A Offering Structure"
      title="The $90.4B Offering Mechanics, in Plain English"
      blurb="How Anthropic structured the largest capital raise in technology history: combining a $64.4B public Class A offering with a $26B strategic Class N private placement and mission-bound 5-class governance."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1/A · Description of Capital Stock"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-t-2 border-t-[#da7756]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <Tag size={16} /> S-1/A Public Offering Terms
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Up to $64.35B Public Class A Raise
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Offers <span className="text-zinc-200 font-medium">825,000,000 Class A shares</span> (801.35M primary by Anthropic + 23.65M secondary, plus 123.75M greenshoe) at{" "}
            <span className="text-emerald-400 font-medium">$70.00–$78.00 / share</span> under Nasdaq ticker{" "}
            <span className="text-zinc-200 font-mono font-medium">ANT</span>, valuing Anthropic at up to{" "}
            <span className="text-zinc-200 font-medium">$1.02T basic / $1.41T fully diluted</span>.
          </p>
        </Card>

        <Card className="border-t-2 border-t-emerald-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
            <Landmark size={16} /> Concurrent Private Placement
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            $26.0B Strategic Class N Round
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Closing simultaneously at the IPO price, strategic silicon and cloud partners are purchasing{" "}
            <span className="text-zinc-200 font-medium">$26B of non-voting Class N stock</span>: anchored by{" "}
            <span className="text-emerald-400 font-medium">Google ($10B)</span> and{" "}
            <span className="text-emerald-400 font-medium">Nvidia ($10B)</span>, plus{" "}
            <span className="text-zinc-200 font-medium">Microsoft, AMD, Broadcom, Micron & TSMC ($6B)</span>.
          </p>
        </Card>

        <Card className="border-t-2 border-t-amber-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Vote size={16} /> 5-Class Voting Architecture
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Class A, F, T, N & E Shares
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Public <span className="text-zinc-200 font-medium">Class A (1 vote/sh)</span> is capped at{" "}
            <span className="text-zinc-200 font-medium">49.9%</span> of general voting power.{" "}
            <span className="text-amber-400 font-medium">Class F (Founder LLC)</span> holds a fixed{" "}
            <span className="text-amber-400 font-medium">50.1% voting majority</span> with no economic rights, while{" "}
            <span className="text-zinc-200 font-medium">Class N</span> carries economic rights with zero votes.
          </p>
        </Card>

        <Card className="border-t-2 border-t-cyan-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
            <Shield size={16} /> Class T & Controlled Company
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            LTBT Appoints 4 of 7 Directors
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Through the non-economic <span className="text-zinc-200 font-medium">Class T share</span>, the independent Long-Term Benefit Trust elects a{" "}
            <span className="text-cyan-400 font-medium">4-of-7 board majority</span> (the Class T Directors), qualifying Anthropic as a "controlled company" under Nasdaq rules to enforce safety guardrails.
          </p>
        </Card>

        <Card className="border-t-2 border-t-indigo-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-indigo-400">
            <Scale size={16} /> Delaware Public Benefit Corp
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Fiduciary Shield Over Short-Termism
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Under DGCL § 362, directors must legally balance stockholder pecuniary returns with Anthropic's charter mandate—developing AI safely for humanity—explicitly warning investors that safety pauses may supersede profit maximization.
          </p>
        </Card>

        <Card className="border-t-2 border-t-purple-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400">
            <Lock size={16} /> Lock-up & Syndicate Scale
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            20+ Underwriters · 180-Day Lock-up
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Led by <span className="text-zinc-200 font-medium">Goldman Sachs and Morgan Stanley</span> across 20+ global bookrunners. Insiders face a 180-day lock-up through May 2027, with staggered early release triggers if ANT trades ≥125% of the IPO price ($97.50).
          </p>
        </Card>
      </div>
    </Section>
  );
}
