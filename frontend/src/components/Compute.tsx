import { Section, Card } from "./Section";
import { data } from "../data";
import { Cpu, Zap, Server } from "lucide-react";

export function Compute() {
  const c = data.compute;

  return (
    <Section
      id="compute"
      eyebrow="Section 05 · Frontier Infrastructure"
      title="The $900 Billion Compute & Data Center Pipeline"
      blurb="Anthropic's S-1 reveals $450B+ in non-cancelable multi-year cloud minimums ($111B Google Cloud, $110B AWS, $31B Microsoft) and up to $900B in total 10-year compute and data center lease obligations."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Commitments & Contingencies"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#262321] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
              <Server size={16} /> Contractual Cloud & Silicon Minimums
            </div>
            <span className="font-mono text-xs text-amber-400 font-semibold tabular">
              $450B Non-Cancelable · $900B Total Pipeline
            </span>
          </div>

          <div className="space-y-4">
            {c.partners.map((p, i) => (
              <div key={i} className="rounded-xl border border-[#282422] bg-[#141211] p-4">
                <div className="flex items-center gap-2 font-semibold text-zinc-100 text-sm">
                  <Cpu size={16} className="text-[#da7756]" />
                  {p.name}
                </div>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  {p.details}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#262321] bg-[#12100f] p-4 text-xs text-zinc-400 space-y-2">
            <div className="font-medium text-zinc-200 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" /> $8.9B H1 2026 Compute Burn & Global Energy Deals
            </div>
            <p className="leading-relaxed text-[11px] text-zinc-500">
              Anthropic spent $8.9B on compute in H1 2026 alone—already surpassing the $7.3B spent across all of FY2025. Beyond AWS and Google Cloud, 2026 agreements include dedicated gigawatt power generation with OnePWR Solutions, Nscale clusters, and European FLAP-D data center expansion.
            </p>
          </div>
        </Card>

        {/* Compute Scaling Curve */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-gradient-to-br from-[#1c1816] via-[#141211] to-[#0f0e0d]">
            <div className="text-xs font-mono uppercase text-[#da7756] mb-3">
              Frontier Model Compute Trajectory
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-200">Claude 4 / 4.5 Series</span>
                  <span className="font-mono text-zinc-400">10²⁶ FLOPs</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div className="h-full bg-zinc-500 rounded-full" style={{ width: "30%" }} />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-500">
                  2025 generation that propelled Anthropic from $386M to $4.59B annual revenue.
                </p>
              </div>

              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#da7756]">Claude 5.5 & Mythos 5.2 (Late 2026)</span>
                  <span className="font-mono text-[#da7756] font-bold">&gt;10²⁷ FLOPs</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div className="h-full bg-[#da7756] rounded-full" style={{ width: "68%" }} />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-400">
                  1M-token context Opus/Sonnet 5.5, Fable 5.2, and Mythos 5.2 cybersecurity & autonomous coding agents.
                </p>
              </div>

              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-400">Next-Gen Superclusters (2027+)</span>
                  <span className="font-mono text-amber-400 font-bold">&gt;10²⁸ FLOPs</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#da7756] to-amber-500 rounded-full" style={{ width: "100%" }} />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-400">
                  "A country of geniuses in a data center" — governed under ASL-4 Responsible Scaling Policy protocols.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
