import { Section, Card } from "./Section";
import { data } from "../data";
import { Tag, Vote, Shield, Lock, Landmark, Scale } from "lucide-react";

export function IPOMechanics() {
  return (
    <Section
      id="ipo"
      eyebrow="Section 02 · Final Offering Structure"
      title="The $107.34B Offering Mechanics, in Plain English"
      blurb="How Anthropic executed the largest capital raise in global market history on November 18, 2026: combining an upsized $81.34B public Class A IPO at $83.00/share with a $26.0B strategic Class N private placement."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="Form 424(b)(4) · Final Prospectus"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-t-2 border-t-[#da7756]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <Tag size={16} /> Final IPO Pricing ($83.00 / sh)
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            $81.34B Public Class A Offering
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Upsized from 825M to <span className="text-zinc-200 font-medium">980,000,000 Class A shares</span> (956.35M primary by Anthropic raising $79.38B + 23.65M secondary, plus 147M greenshoe) priced at{" "}
            <span className="text-emerald-400 font-medium">$83.00 / share</span> (above $70–$78 range) under Nasdaq ticker{" "}
            <span className="text-zinc-200 font-mono font-medium">ANT</span> at a{" "}
            <span className="text-zinc-200 font-medium">$1.50T fully diluted valuation</span>.
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
            Closing immediately alongside the IPO at the identical <span className="text-zinc-200 font-medium">$83.00/share</span> price: anchored by{" "}
            <span className="text-emerald-400 font-medium">Google ($10B)</span> and{" "}
            <span className="text-emerald-400 font-medium">NVIDIA ($10B)</span>, alongside{" "}
            <span className="text-zinc-200 font-medium">AMD ($2.5B), Broadcom ($1B), Micron ($1B), Microsoft ($1B) & TSMC ($500M)</span>.
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
            Led by <span className="text-zinc-200 font-medium">Goldman Sachs and Morgan Stanley</span> across 20+ global bookrunners. Insiders face a 180-day lock-up through May 2027, with staggered early release triggers if ANT trades ≥125% of the $83.00 IPO price ($103.75).
          </p>
        </Card>
      </div>
    </Section>
  );
}
