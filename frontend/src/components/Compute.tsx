import { Section, Card, Stat } from "./Section";
import { data } from "../data";
import { Cpu, Zap, Server, Globe2, ShieldAlert, CheckCircle2 } from "lucide-react";

export function Compute() {
  const c = data.compute;

  return (
    <Section
      id="compute"
      eyebrow="Section 05 · Frontier Infrastructure"
      title="The $518 Billion Compute Moat"
      blurb="Frontier intelligence is fundamentally an energy and silicon game. Anthropic has committed over half a trillion dollars across multi-gigawatt data centers, custom AWS Trainium chips, and Google TPU superclusters."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Infrastructure & Contractual Commitments"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#262321] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
              <Server size={16} /> Multi-Year Hyperscaler Agreements
            </div>
            <span className="font-mono text-xs text-amber-400 font-semibold tabular">
              $518,000,000,000 Committed
            </span>
          </div>

          <div className="space-y-4">
            {c.partners.map((p, i) => (
              <div key={i} className="rounded-xl border border-[#282422] bg-[#141211] p-4">
                <div className="flex items-center gap-2 font-semibold text-zinc-100 text-sm">
                  <Cpu size={16} className="text-[#da7756]" />
                  {p.name} Strategic Silicon Allocation
                </div>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  {p.details}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#262321] bg-[#12100f] p-4 text-xs text-zinc-400 space-y-2">
            <div className="font-medium text-zinc-200 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" /> Multi-Gigawatt Power & Nuclear Sourcing
            </div>
            <p className="leading-relaxed text-[11px] text-zinc-500">
              Training next-generation frontier models requires continuous gigawatt-scale power availability. AWS and Google Cloud contracts guarantee dedicated high-voltage substation feeds and co-located small modular reactor (SMR) clean energy partnerships.
            </p>
          </div>
        </Card>

        {/* Compute Scaling Curve */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-gradient-to-br from-[#1c1816] via-[#141211] to-[#0f0e0d]">
            <div className="text-xs font-mono uppercase text-[#da7756] mb-3">
              Compute Scaling Trajectory
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-200">Claude 3.5 Sonnet</span>
                  <span className="font-mono text-zinc-400">10²⁶ FLOPs</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div className="h-full bg-zinc-500 rounded-full" style={{ width: "30%" }} />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-500">
                  State-of-the-art coding and agentic execution benchmark leader.
                </p>
              </div>

              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#da7756]">Claude 4 Frontier</span>
                  <span className="font-mono text-[#da7756] font-bold">&gt;10²⁷ FLOPs</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div className="h-full bg-[#da7756] rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-400">
                  Autonomous software engineering and multi-modal scientific reasoning.
                </p>
              </div>

              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-400">Next-Gen Supercluster</span>
                  <span className="font-mono text-amber-400 font-bold">&gt;10²⁸ FLOPs</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[#262321] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#da7756] to-amber-500 rounded-full" style={{ width: "100%" }} />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-400">
                  ASL-4 safeguard compliance threshold requiring full LTBT safety signoff.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
