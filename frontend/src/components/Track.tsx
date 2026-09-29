import { Section, Card, Stat, SourceLink } from "./Section";
import { data, fmtDate } from "../data";
import { usePrices, pctChange } from "../usePrices";
import { useFilings } from "../useFilings";
import { CalendarClock, FileText, ExternalLink, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

const daysUntil = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.ceil((Date.UTC(y, m - 1, d) - Date.now()) / 86_400_000);
};

export function Track() {
  const { data: px } = usePrices();
  const { data: fl } = useFilings();

  const ipo = data.ipo;
  const t = ipo.expected_timeline;
  const publicS1Days = daysUntil(t.public_s1_drop);
  const roadshowDays = daysUntil(t.roadshow_start);
  const pricingDays = daysUntil(t.pricing_date);
  const lockupDays = daysUntil(ipo.lock_up.expiry_date);

  const price = px?.latest.price ?? 2041.5;
  const impliedCapT = px?.latest.implied_valuation_t ?? 2.04;
  const fy2025Rev = data.financials.summary.fy2025_revenue_usd_billions;
  const ps2025 = (impliedCapT * 1000) / fy2025Rev;
  const ps2026E = (impliedCapT * 1000) / 12.5;

  return (
    <Section
      id="track"
      eyebrow="Timeline · SEC Watch"
      title="Road to Nasdaq: Key Milestones & Filings"
      blurb="Tracking the confidential SEC review under the JOBS Act, the upcoming public S-1 prospectus drop, roadshow window, and post-listing lockup calendar."
      sourceUrl="https://www.sec.gov/edgar/searchedgar/companysearch"
      sourceLabel="SEC EDGAR Company Search"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Timeline Events */}
        <Card className="lg:col-span-7">
          <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
              <CalendarClock size={14} /> Offering Timetable & Lock-up
            </div>
            <span className="rounded-full border border-[#38332f] bg-[#141211] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
              JOBS Act Protocol
            </span>
          </div>

          <div className="space-y-4">
            <TimelineRow
              title="Confidential Form S-1 Submitted (DRS)"
              date="1 Jun 2026"
              badge="Completed"
              badgeTone="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              desc="Draft Registration Statement submitted confidentially to SEC Division of Corporation Finance under Section 6(e) of the Securities Act."
            />

            <TimelineRow
              title="Public S-1 Drop (Mandatory Disclosure)"
              date={fmtDate(t.public_s1_drop)}
              badge={publicS1Days > 0 ? `${publicS1Days} days away` : "Pending"}
              badgeTone="bg-[#da7756]/10 text-[#da7756] border-[#da7756]/30"
              desc="SEC regulations require confidential filers to publicly file the S-1 and all amendments at least 15 days before launching the institutional roadshow."
            />

            <TimelineRow
              title="Institutional Roadshow & Bookbuilding"
              date={fmtDate(t.roadshow_start)}
              badge={roadshowDays > 0 ? `${roadshowDays} days away` : "Upcoming"}
              badgeTone="bg-zinc-800 text-zinc-300 border-zinc-700"
              desc="Dario & Daniela Amodei present financial trajectory, $518B compute roadmap, and safety commitments to sovereign and institutional investors."
            />

            <TimelineRow
              title="Final Pricing & Trading Launch"
              date={fmtDate(t.pricing_date)}
              badge={pricingDays > 0 ? `${pricingDays} days away` : "Target Window"}
              badgeTone="bg-zinc-800 text-zinc-300 border-zinc-700"
              desc="Underwriters price the offering; ANTH begins trading on the Nasdaq Global Select Market next morning."
            />

            <TimelineRow
              title="Tiered Lock-up Expiry (180 Days)"
              date={fmtDate(ipo.lock_up.expiry_date)}
              badge={`${lockupDays} days away`}
              badgeTone="bg-zinc-800 text-zinc-400 border-zinc-700"
              desc={ipo.lock_up.tiered_early_release}
            />
          </div>
        </Card>

        {/* Live Multiples & SEC Filings */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <div className="text-xs font-mono uppercase text-zinc-400 mb-2">Live Valuation Multiples</div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[11px] text-zinc-500 font-mono">P/S on 2025 Revenue</div>
                <div className="text-xl font-bold text-zinc-100 tabular mt-0.5">{ps2025.toFixed(0)}×</div>
                <div className="text-[10px] text-zinc-400">$4.62B actual</div>
              </div>
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[11px] text-zinc-500 font-mono">P/S on 2026E Run-Rate</div>
                <div className="text-xl font-bold text-[#da7756] tabular mt-0.5">{ps2026E.toFixed(0)}×</div>
                <div className="text-[10px] text-zinc-400">~$12.5B estimated</div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
              At ~$2.04T implied valuation, Anthropic trades at a premium reflecting frontier AI reasoning monopoly and rapid enterprise adoption of Claude Code.
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 mb-3">
              <span className="flex items-center gap-1.5">
                <FileText size={14} className="text-[#da7756]" /> Regulatory Filings Feed
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">CIK 0001994821</span>
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
