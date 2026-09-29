import { Section, Card } from "./Section";
import { data } from "../data";
import { AlertTriangle, ShieldAlert, Cpu, Scale, Flame, Lock } from "lucide-react";

export function Risks() {
  const risks = data.risk_factors;

  const iconList = [Cpu, Scale, Flame, AlertTriangle, ShieldAlert];

  return (
    <Section
      id="risks"
      eyebrow="Section 08 · Risk Factors"
      title="Key Risk Factors from the S-1"
      blurb="Primary-source disclosure of material risks that could adversely impact Anthropic's business, liquidity, and equity valuation."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="S-1 · Risk Factors"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {risks.map((r, i) => {
          const Icon = iconList[i % iconList.length];
          return (
            <Card key={i} className="border-t-2 border-t-red-500/80 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400">
                  <Icon size={16} /> Risk Factor 0{i + 1}
                </div>
                <h3 className="mt-2 text-base font-semibold text-zinc-100">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {r.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
