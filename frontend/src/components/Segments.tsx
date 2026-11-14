import { Section, Card } from "./Section";
import { data } from "../data";
import { Code, Cloud, Building2, User, Zap } from "lucide-react";

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
      title="Product Segments & H1 2026 Revenue Mix"
      blurb="How Anthropic generated $16.29B in H1 2026 revenue: 80.2% consumption-based token billing ($13.06B across direct API and AWS/GCP cloud marketplaces) and 19.8% subscriptions ($3.22B across Claude Enterprise, Cowork, Pro, and Max)."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Revenue Disaggregation (Note 3)"
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
                      {seg.period_label}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-[#da7756] tabular">
                    {seg.share_pct}%
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">H1 26 Share</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-zinc-300 leading-relaxed">
                {seg.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#262321] space-y-1.5">
                {Object.entries(seg.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-xs gap-4">
                    <span className="text-zinc-500 capitalize shrink-0">{key.replace(/_/g, " ")}:</span>
                    <span className="font-medium text-zinc-200 text-right">
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
