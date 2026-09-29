import { Section, Card } from "./Section";
import { data } from "../data";
import { Code, Cloud, Building2, User, CheckCircle2, Zap } from "lucide-react";

export function Segments() {
  const segments = data.segments;

  const iconMap: Record<string, any> = {
    api: Code,
    cloud: Cloud,
    enterprise: Building2,
    consumer: User,
  };

  return (
    <Section
      id="segments"
      eyebrow="Section 04 · Revenue Engine"
      title="Product Segments & Revenue Streams"
      blurb="How Anthropic monetizes frontier intelligence across developer APIs, cloud hyperscaler alliances, enterprise agentic SaaS, and consumer subscriptions."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Business · Segment Reporting"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {segments.map((seg) => {
          const Icon = iconMap[seg.id] || Zap;
          return (
            <Card key={seg.id} className="relative overflow-hidden border-t-2 border-t-[#da7756]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#da7756]/10 text-[#da7756]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100 text-base">{seg.name}</h3>
                    <div className="text-xs font-mono text-zinc-500">
                      ${(seg.revenue_2025_millions / 1000).toFixed(2)}B in 2025
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-[#da7756] tabular">
                    {seg.share_pct}%
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Revenue Share</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-zinc-300 leading-relaxed">
                {seg.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#262321] space-y-1.5">
                {Object.entries(seg.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 capitalize">{key.replace(/_/g, " ")}:</span>
                    <span className="font-medium text-zinc-200">
                      {Array.isArray(value) ? value.join(" · ") : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
