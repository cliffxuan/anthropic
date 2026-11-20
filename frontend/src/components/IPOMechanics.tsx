import { Section, Card } from "./Section";
import { SEC_URL } from "../data";
import { Tag, Vote, Shield, Lock, Landmark, Scale } from "lucide-react";

export function IPOMechanics() {
  return (
    <Section
      id="ipo"
      eyebrow="Section 02 · Form 424(b)(4) Final Offering Structure"
      title="The $107.34B Gross ($104.8B Net) Offering Mechanics"
      blurb="How Anthropic, PBC executed the largest capital raise in global market history: pricing 980,000,000 Class A shares at $83.00/sh ($81.34B gross) alongside a concurrent $26.0B Class N private placement."
      sourceUrl={SEC_URL}
      sourceLabel="SEC Form 424(b)(4) · Final Prospectus"
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
            Upsized from 825M to <span className="text-zinc-200 font-medium">980,000,000 Class A shares</span> (956,351,354 primary by Anthropic raising $78.84B net after $0.56122/sh underwriting discount + 23,648,646 secondary by co-founders = $1.95B, plus 147M greenshoe) priced at{" "}
            <span className="text-emerald-400 font-medium">$83.00 / share</span> under Nasdaq ticker{" "}
            <span className="text-zinc-200 font-mono font-medium">ANT</span> ($1.51T FDV / $1.10T Basic).
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
            Closed concurrently with the IPO at <span className="text-zinc-200 font-medium">$83.00/share</span> (313,253,007 Class N shares, zero discount): anchored by{" "}
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
            Public <span className="text-zinc-200 font-medium">Class A (7.58B sh · 1 vote/sh)</span> is capped at{" "}
            <span className="text-zinc-200 font-medium">49.9%</span> of general voting power.{" "}
            <span className="text-amber-400 font-medium">Class F (Founder LLC · 1 sh)</span> holds a fixed{" "}
            <span className="text-amber-400 font-medium">50.1% voting majority</span> with no economic rights, while{" "}
            <span className="text-zinc-200 font-medium">Class N (5.64B sh)</span> carries economic rights with zero votes.
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
            Through the single non-economic <span className="text-zinc-200 font-medium">Class T share</span>, the independent Long-Term Benefit Trust elects a{" "}
            <span className="text-cyan-400 font-medium">4-of-7 board majority</span> (the Class T Directors), qualifying Anthropic as a "controlled company" under Nasdaq rules to enforce safety guardrails.
          </p>
        </Card>

        <Card className="border-t-2 border-t-indigo-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-indigo-400">
            <Scale size={16} /> Public Benefit Fund (846.8M Sh)
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            ~$70.3B Philanthropic Equity Grant
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Upon IPO closing, Anthropic issued <span className="text-zinc-200 font-medium">846,840,960 Class N shares</span> (~6.4% of basic shares) to the Anthropic Public Benefit Fund to mitigate societal AI disruptions—unlocking across 8 tranches beginning once ANT trades ≥$124.50 (+50%).
          </p>
        </Card>

        <Card className="border-t-2 border-t-purple-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400">
            <Lock size={16} /> Staged Lock-up & Syndicate
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            21 Underwriters · 9 Release Tranches
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Led by <span className="text-zinc-200 font-medium">Goldman Sachs and Morgan Stanley</span> across 21 bookrunners (0.68% fee = $550M). ~15.5B shares are locked under 180-day (to May 17, 2027) and 365-day (to Nov 18, 2027 for co-founders & &gt;0.5% holders) staged release windows.
          </p>
        </Card>
      </div>
    </Section>
  );
}
