import { Section, Card } from "./Section";
import { data, fmtDate } from "../data";
import { ExternalLink } from "lucide-react";

export function News() {
  const news = data.latest_news;

  const badgeTone = (cat: string) => {
    if (cat.includes("SEC")) return "border-[#da7756]/40 bg-[#da7756]/10 text-[#da7756]";
    if (cat.includes("Product")) return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
    if (cat.includes("Legal")) return "border-amber-500/40 bg-amber-500/10 text-amber-400";
    return "border-cyan-500/40 bg-cyan-500/10 text-cyan-400";
  };

  return (
    <Section
      id="news"
      eyebrow="Breaking · Post-IPO Trading & SEC Filings"
      title="Latest News, Filings & Catalysts"
      blurb="Real-time tracker of Anthropic's completed $83.00/share IPO ($104.8B net proceeds settled Nov 20, 2026), Nasdaq: ANT secondary-market trading (Day 1 open $111.50, high $115.10, close $97.17), Form 424(b)(4) financial disclosures ($33.24B 9M'26 revenue, $81B Oct run-rate), Claude 5.5 & Mythos 5.2 launches, and the Pentagon Acceptable-Use litigation."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="SEC EDGAR · CIK 0002130357"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, i) => (
          <Card key={i} className="flex flex-col justify-between border-t-2 border-t-[#da7756]/80 hover:border-[#da7756]/60 transition">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase ${badgeTone(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">{fmtDate(item.date)}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-zinc-100 leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {item.summary}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#262321] flex items-center justify-between text-[11px]">
              <span className="font-mono text-zinc-500">{item.source}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#da7756] hover:underline font-medium"
              >
                Source <ExternalLink size={11} />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
