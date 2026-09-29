import { Section, Card, SourceLink } from "./Section";
import { data, fmtDate } from "../data";
import { Tag, Vote, Shield, Lock, Landmark, FileText, CheckCircle, Scale } from "lucide-react";

export function IPOMechanics() {
  const ipo = data.ipo;

  return (
    <Section
      id="ipo"
      eyebrow="Section 02 · Offering Structure"
      title="The Offering Mechanics, in Plain English"
      blurb="Public capital with mission-bound governance. The key structural mechanisms of Anthropic PBC's proposed listing, from multi-class voting to Delaware Public Benefit Corporation protections."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Description of Capital Stock"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-t-2 border-t-[#da7756]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
            <Tag size={16} /> Target Offering Terms
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            $25.0B in Gross Proceeds
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            The offering models <span className="text-zinc-200 font-medium">125 million shares of Class A common stock</span> at a target price of{" "}
            <span className="text-emerald-400 font-medium">$200.00 / share</span>, implying a{" "}
            <span className="text-zinc-200 font-medium">~$2.0 Trillion</span> fully-diluted market capitalization upon listing.
          </p>
        </Card>

        <Card className="border-t-2 border-t-amber-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Vote size={16} /> Multi-Class Voting
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Class A, Class B & Class T
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Public buyers receive <span className="text-zinc-200 font-medium">Class A (1 vote/share)</span>. Founders (Dario & Daniela Amodei) hold{" "}
            <span className="text-zinc-200 font-medium">Class B (10 votes/share)</span>, controlling{" "}
            <span className="text-amber-400 font-medium">58.4% of total voting power</span>. The Trust holds the non-economic <span className="text-zinc-200 font-medium">Class T</span>.
          </p>
        </Card>

        <Card className="border-t-2 border-t-cyan-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
            <Scale size={16} /> Delaware Public Benefit Corp
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Protected Safety Mandate
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Incorporated as a Delaware PBC. Fiduciaries are legally obligated to consider societal wellbeing and safe AI stewardship alongside equity value, shielding the board from hostile short-term activist litigation.
          </p>
        </Card>

        <Card className="border-t-2 border-t-emerald-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
            <Shield size={16} /> The Long-Term Benefit Trust
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Independent Safety Veto
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            An independent trust that exercises board election authority. As model capabilities advance across ASL-3 and ASL-4, the Trust gains power to elect a majority of directors to enforce safe frontier deployment.
          </p>
        </Card>

        <Card className="border-t-2 border-t-indigo-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-indigo-400">
            <Lock size={16} /> Tiered Lock-up Schedule
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            180 Days with Performance Tranche
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Standard insider lock-up of 180 days. A tiered release allows <span className="text-zinc-200 font-medium">20% to unlock</span> following the first 10-Q filing if the stock trades 25% above the offering price for 10 of 15 trading days.
          </p>
        </Card>

        <Card className="border-t-2 border-t-purple-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400">
            <Landmark size={16} /> Benchmark Index Outlook
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Fast-Track Nasdaq 100
          </h3>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Given its $2T debut size, ANTH is primed for accelerated inclusion into the Nasdaq 100 and mega-cap tech index funds, driving billions in passive ETF inflows post-offering.
          </p>
        </Card>
      </div>
    </Section>
  );
}
