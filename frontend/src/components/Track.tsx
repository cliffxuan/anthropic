import { Section, Card } from "./Section";
import { data, fmtDate } from "../data";
import { usePrices } from "../usePrices";
import { useFilings } from "../useFilings";
import { CalendarClock, FileText, ExternalLink } from "lucide-react";

const daysUntil = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.ceil((Date.UTC(y, m - 1, d) - Date.now()) / 86_400_000);
};

export function Track() {
  const { data: px } = usePrices();
  const { data: fl } = useFilings();

  const ipo = data.ipo;
  const t = ipo.expected_timeline;
  const pricingDays = daysUntil(t.pricing_date);
  const tradingDays = daysUntil(t.trading_start);
  const lockupDays = daysUntil(ipo.lock_up.expiry_date);

  const impliedCapT = px?.latest.implied_valuation_t ?? 1.771;
  const s1aCapT = ipo.target_valuation_usd_trillions; // 1.41T
  const octArrB = data.financials.summary.oct_2026_arr_usd_billions; // $81.0B
  const psArrPerp = (impliedCapT * 1000) / octArrB;
  const psArrS1A = (s1aCapT * 1000) / octArrB;

  return (
    <Section
      id="track"
      eyebrow="Timeline · SEC Watch"
      title="Road to Nasdaq (ANT): Key Milestones & Filings"
      blurb="Tracking Anthropic's progression from its June 2026 confidential DRS submission to the October 26 public S-1 drop, the November 10 S-1/A roadshow launch ($70–$78/share), and the November 18–19 pricing and Nasdaq debut."
      sourceUrl={data.filing_metadata.source_url}
      sourceLabel="SEC EDGAR · CIK 0002130357"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Timeline Events */}
        <Card className="lg:col-span-7">
          <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
              <CalendarClock size={14} /> Offering Timetable & Lock-up
            </div>
            <span className="rounded-full border border-[#38332f] bg-[#141211] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
              Nasdaq: ANT
            </span>
          </div>

          <div className="space-y-4">
            <TimelineRow
              title="Confidential Form S-1 Submitted (DRS)"
              date="1 Jun 2026"
              badge="Completed"
              badgeTone="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              desc="Initial Draft Registration Statement submitted confidentially to the SEC Division of Corporation Finance following the $65B Series H round."
            />

            <TimelineRow
              title="Public Form S-1 Registration Filed"
              date={fmtDate(t.public_s1_drop)}
              badge="Completed"
              badgeTone="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              desc="Anthropic unsealed its S-1 on SEC EDGAR (CIK 0002130357), unveiling $16.29B H1 2026 revenue, Q2 operating profitability ($974M), and the 5-class governance structure."
            />

            <TimelineRow
              title="Form S-1/A & Institutional Roadshow Launch"
              date={fmtDate(t.roadshow_start)}
              badge="Live Now"
              badgeTone="bg-[#da7756]/15 text-[#da7756] border-[#da7756]/40"
              desc="S-1/A sets price range at $70.00–$78.00/share for 825M Class A shares ($64.4B max public offering) alongside a $26B concurrent Class N private placement anchored by Google & Nvidia."
            />

            <TimelineRow
              title="Final IPO Pricing & Nasdaq Trading Debut (ANT)"
              date={`${fmtDate(t.pricing_date)} – ${fmtDate(t.trading_start)}`}
              badge={pricingDays > 0 ? `${pricingDays}d to pricing · ${tradingDays}d to debut` : "Imminent"}
              badgeTone="bg-amber-500/10 text-amber-400 border-amber-500/30"
              desc="Goldman Sachs and Morgan Stanley price the heavily oversubscribed offering on Nov 18; Class A shares begin trading on the Nasdaq Global Select Market under ticker ANT on Nov 19."
            />

            <TimelineRow
              title="Tiered Lock-up Expiry (180 Days)"
              date={fmtDate(ipo.lock_up.expiry_date)}
              badge={lockupDays > 0 ? `${lockupDays} days away` : "Scheduled"}
              badgeTone="bg-zinc-800 text-zinc-400 border-zinc-700"
              desc={ipo.lock_up.tiered_early_release}
            />
          </div>
        </Card>

        {/* Live Multiples & SEC Filings */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <div className="text-xs font-mono uppercase text-zinc-400 mb-2">Valuation Multiples on $81B Oct ARR</div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[11px] text-zinc-500 font-mono">S-1/A Top ($1.41T FDV)</div>
                <div className="text-xl font-bold text-emerald-400 tabular mt-0.5">{psArrS1A.toFixed(1)}×</div>
                <div className="text-[10px] text-zinc-400">at $78/sh · $81B ARR</div>
              </div>
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[11px] text-zinc-500 font-mono">Perp Implied (${impliedCapT.toFixed(2)}T)</div>
                <div className="text-xl font-bold text-[#da7756] tabular mt-0.5">{psArrPerp.toFixed(1)}×</div>
                <div className="text-[10px] text-zinc-400">io:ANTH · $81B ARR</div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
              With 9M 2026 revenue reaching $33.2B ($17.0B in Q3 alone) and October 2026 ARR hitting $81B, Anthropic's S-1/A prices the company at ~17.4× forward run-rate.
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 mb-3">
              <span className="flex items-center gap-1.5">
                <FileText size={14} className="text-[#da7756]" /> Regulatory Filings Feed
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">CIK {data.filing_metadata.cik}</span>
            </div>

            <div className="space-y-2.5">
              {fl?.filings.map((f, i) => (
                <div key={i} className="rounded-lg border border-[#262321] bg-[#131110] p-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-200">{f.form}</span>
                    <span className="font-mono text-zinc-500 text-[10px]">{f.filed}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">{f.description}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-[#da7756] font-mono">{f.status}</span>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200"
                    >
                      View Record <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function TimelineRow({
  title,
  date,
  badge,
  badgeTone,
  desc,
}: {
  title: string;
  date: string;
  badge: string;
  badgeTone: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-[#282422] bg-[#141211] p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-semibold text-sm text-zinc-200">{title}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400">{date}</span>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-mono ${badgeTone}`}>
            {badge}
          </span>
        </div>
      </div>
      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}
