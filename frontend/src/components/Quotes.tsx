import { Section, Card } from "./Section";
import { data } from "../data";
import { Quote, Sparkles } from "lucide-react";

export function Quotes() {
  const quotes = data.quotes;

  return (
    <Section
      id="quotes"
      eyebrow="Section 10 · The Mission"
      title="In Their Own Words"
      blurb="Excerpts from Dario Amodei's Founder Letter to S-1 shareholders and Anthropic's landmark essays on the adolescence of transformative technology."
      sourceUrl="https://darioamodei.com/machines-of-loving-grace"
      sourceLabel="Dario Amodei · Machines of Loving Grace"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Card key={i} className="flex flex-col justify-between p-6 bg-gradient-to-b from-[#181514] to-[#110f0e]">
            <div>
              <Quote size={24} className="text-[#da7756]/40 mb-3" />
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "{q.text}"
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#262321]">
              <div className="text-xs font-semibold text-zinc-100">{q.author}</div>
              <div className="text-[11px] font-mono text-[#da7756] mt-0.5">{q.source}</div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
