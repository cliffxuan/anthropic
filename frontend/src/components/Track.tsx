import { Section, Card } from "./Section";
import { data, fmtDate, SEC_URL } from "../data";
import { usePrices } from "../usePrices";
import { useFilings } from "../useFilings";
import { CalendarClock, FileText, ExternalLink, Lock, Unlock } from "lucide-react";

const daysUntil = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.ceil((Date.UTC(y, m - 1, d) - Date.now()) / 86_400_000);
};

export function Track() {
  const { data: px } = usePrices();
  const { data: fl } = useFilings();

  const ipo = data.ipo;
  const t = ipo.expected_timeline;
  const nextUnlockDate = ipo.lock_up.tranches[1]?.date ?? "2026-12-15";
  const nextUnlockDays = daysUntil(nextUnlockDate);
  const fullLockupDays = daysUntil(ipo.lock_up.expiry_date);

  const stock = px?.latest.stock ?? px?.xyz_ant?.price ?? 87.6;
  const fdvT = px?.latest.stock_fdv_t ?? (stock * 18.1376) / 1000;
  const basicCapT = px?.latest.stock_basic_cap_t ?? (stock * 13.2196) / 1000;
  const ttmRevB = 35.284; // Q4'25 ($2.044B) + 9M'26 ($33.240B)
  const octArrB = 81.0; // $81B Oct '26 annualized run-rate
  const psTtmBasic = (basicCapT * 1000) / ttmRevB;
  const psArrFdv = (fdvT * 1000) / octArrB;
  const basisPct = px?.xyz_ant?.basis_vs_stock_pct ?? 0.0;

  return (
    <Section
      id="track"
      eyebrow="Post-IPO Tracker · Lock-up Schedule & SEC EDGAR"
      title="Completed IPO Milestones, 9-Tranche Lock-up & Live Filings"
      blurb="Anthropic completed its IPO pricing ($83.00/sh) on November 18, debuted on Nasdaq (ANT) on November 19, and closed settlement on November 20, 2026. Track the 9-tranche lock-up release schedule (~15.5B shares locked; next release Dec 15, 2026) and live SEC EDGAR filings."
      sourceUrl={SEC_URL}
      sourceLabel="SEC Form 424(b)(4) · p. 318"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Completed IPO Timeline + Staged Lock-up Table */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
                <CalendarClock size={14} /> Completed IPO Execution & Post-IPO Calendar
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
                IPO Settled · Trading Live
              </span>
            </div>

            <div className="space-y-3.5">
              <TimelineRow
                title="Public Form S-1 & S-1/A #1–#3 Roadshow"
                date="24 Oct – 16 Nov 2026"
                badge="Completed"
                badgeTone="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                desc="Unsealed Form S-1 on Oct 24, launched bookbuilding at $64–$72 (Nov 10), and raised the range to $70–$78 (Nov 16) across 825M Class A shares."
              />

              <TimelineRow
                title="Rule 462(b) S-1MEF Upsize & $83.00/sh Final Pricing"
                date={fmtDate(t.pricing_date)}
                badge="Completed · $107.34B Gross"
                badgeTone="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                desc="Priced 980,000,000 Class A shares at $83.00/sh ($81.34B IPO; 956.35M primary + 23.65M secondary) plus 313,253,007 Class N shares ($26.0B private placement)."
              />

              <TimelineRow
                title="Nasdaq Global Select Debut (Ticker: ANT) & Form 424(b)(4)"
                date={fmtDate(t.trading_start)}
                badge="Completed · Day 1 +17.1%"
                badgeTone="bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                desc="Opened at $111.50/sh (+34.3%), reached $115.10 intraday high (+38.7%), and closed Day 1 at $97.17 (+17.1%) on 857.3M shares volume. Up to 315M employee Class A shares unlocked on Day 1."
              />

              <TimelineRow
                title="IPO & Concurrent Private Placement Settlement"
                date={fmtDate(t.settlement_date)}
                badge="Completed"
                badgeTone="bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                desc="Closed delivery of 980M Class A IPO shares and 313.25M Class N private placement shares, bringing pro forma cash and short-term investments to $232.35B."
              />

              <TimelineRow
                title="Next Lock-up Release: Day 27 Tranche (Up to 303M Shares)"
                date={fmtDate(nextUnlockDate)}
                badge={nextUnlockDays > 0 ? `In ${nextUnlockDays} days` : "Unlocked"}
                badgeTone="bg-[#da7756]/20 text-[#da7756] border-[#da7756]/40"
                desc={`First post-IPO employee & <0.5% stockholder release window (up to 174M Class A + 129M Class N shares). Standard 180-day lock-up expires ${fmtDate(ipo.lock_up.expiry_date)} (${fullLockupDays}d).`}
              />
            </div>
          </Card>

          {/* 9-Tranche Lock-up Schedule from Form 424(b)(4) p. 318 */}
          <Card>
            <div className="flex items-center justify-between border-b border-[#262321] pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#da7756]">
                <Lock size={14} /> Form 424(b)(4) Staged Lock-up Release Schedule (~15.5B Locked)
              </div>
              <span className="text-[11px] font-mono text-zinc-500">Page 318 · Shares Eligible for Future Sale</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#262321] text-[10px] font-mono uppercase text-zinc-500">
                    <th className="py-2 pr-2">Release Date</th>
                    <th className="py-2 px-2">Tranche / Release Window</th>
                    <th className="py-2 px-2 text-right">Max Total</th>
                    <th className="py-2 pl-2 text-right">Class A / Class N</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#221f1d] text-zinc-300">
                  {ipo.lock_up.tranches.map((tr, i) => (
                    <tr key={i} className={i === 0 ? "bg-emerald-500/5" : i === 1 ? "bg-[#da7756]/5" : ""}>
                      <td className="py-2.5 pr-2 font-mono text-[11px] text-zinc-200 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {i === 0 ? (
                            <Unlock size={12} className="text-emerald-400 shrink-0" />
                          ) : (
                            <Lock size={12} className="text-zinc-500 shrink-0" />
                          )}
                          <span>{fmtDate(tr.date)}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[11px] text-zinc-300">{tr.label}</td>
                      <td className="py-2.5 px-2 text-right font-mono font-semibold text-zinc-100 tabular whitespace-nowrap">
                        {tr.total_millions >= 1000
                          ? `${(tr.total_millions / 1000).toFixed(2)}B`
                          : `${tr.total_millions}M`}
                      </td>
                      <td className="py-2.5 pl-2 text-right font-mono text-[11px] text-zinc-400 tabular whitespace-nowrap">
                        {tr.class_a_millions}M A / {tr.class_n_millions}M N
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
              <strong className="text-zinc-300">Public Benefit Fund (846.8M Class N shares):</strong> Separately locked across 8 tranches (up to 105.9M shares each); the first tranche unlocks only after ANT trades ≥50% above the IPO price (<strong className="text-emerald-400">$124.50/sh</strong>) for 20 of 30 trading days.
            </p>
          </Card>
        </div>

        {/* Live Multiples, Index Inclusion & SEC EDGAR Feed */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <div className="text-xs font-mono uppercase text-zinc-400 mb-2">
              Live Nasdaq: ANT Valuation Multiples (${stock.toFixed(2)}/sh)
            </div>
            <div className="grid grid-cols-3 gap-2.5 mt-3">
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[10px] text-zinc-500 font-mono">Basic / $35.3B TTM</div>
                <div className="text-lg font-bold text-emerald-400 tabular mt-0.5">{psTtmBasic.toFixed(1)}×</div>
                <div className="text-[10px] text-zinc-400">${basicCapT.toFixed(2)}T Basic</div>
              </div>
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[10px] text-zinc-500 font-mono">FDV / $81B Run-Rate</div>
                <div className="text-lg font-bold text-[#da7756] tabular mt-0.5">{psArrFdv.toFixed(1)}×</div>
                <div className="text-[10px] text-zinc-400">${fdvT.toFixed(2)}T FDV</div>
              </div>
              <div className="rounded-xl border border-[#2a2624] bg-[#12100f] p-3">
                <div className="text-[10px] text-zinc-500 font-mono">xyz:ANT Basis</div>
                <div className="text-lg font-bold text-cyan-400 tabular mt-0.5">
                  {basisPct >= 0 ? "+" : ""}
                  {basisPct.toFixed(2)}%
                </div>
                <div className="text-[10px] text-zinc-400">Perp vs. Nasdaq</div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-zinc-500 leading-relaxed space-y-1.5">
              <div>
                <strong className="text-zinc-300">Nasdaq-100 ({ipo.index_outlook.nasdaq_100.estimate}):</strong>{" "}
                {ipo.index_outlook.nasdaq_100.detail}
              </div>
              <div>
                <strong className="text-zinc-300">S&P 500 ({ipo.index_outlook.sp_500.estimate}):</strong>{" "}
                {ipo.index_outlook.sp_500.detail}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 mb-3">
              <span className="flex items-center gap-1.5">
                <FileText size={14} className="text-[#da7756]" /> Live SEC EDGAR Filings Feed
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">CIK {data.filing_metadata.cik}</span>
            </div>

            <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
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
                      View SEC Filing <ExternalLink size={10} />
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
