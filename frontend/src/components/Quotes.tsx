import { Section, Card } from "./Section";
import { data } from "../data";
import { Quote } from "lucide-react";

export function Quotes() {
  const quotes = data.quotes;

  return (
    <Section
      id="quotes"
      eyebrow="Section 10 · The Mission"
      title="In Their Own Words"
      blurb="Excerpts from Dario and Daniela Amodei's Founders' Letter in the October 2026 Form S-1 prospectus ('The Exponential in Cognition') and Anthropic's Public Benefit Charter."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="Form S-1 · Letter from the Founders"
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
