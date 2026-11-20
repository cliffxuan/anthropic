import { usePrices } from "../usePrices";
import { SEC_URL, FWP_PRICING_URL } from "../data";
import { TrendingUp, BookOpen, Calculator, ShieldCheck, ExternalLink, FileText, Newspaper } from "lucide-react";

export function Hero() {
  const { data: px } = usePrices();

  const stock = px?.latest.stock ?? px?.xyz_ant?.price ?? 87.6;
  const vsIpo = px?.latest.stock_vs_ipo_pct ?? ((stock - 83.0) / 83.0) * 100;
  const fdvT = px?.latest.stock_fdv_t ?? (stock * 18.138) / 1000;
  const basicCapT = px?.latest.stock_basic_cap_t ?? (stock * 13.22) / 1000;
  const day1High = px?.latest.first_day_high ?? 115.1;
  const day1Close = px?.latest.first_day_close ?? 97.17;

  return (
    <div className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 anthropic-bg border-b border-[#262321]">
      <div className="mx-auto max-w-6xl px-5">
        {/* Top Status Banner */}
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/30 bg-[#1a1715]/90 px-3.5 py-1.5 text-xs text-zinc-200 backdrop-blur">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-semibold text-emerald-400">IPO Completed & Trading on Nasdaq: ANT</span>
          <span className="text-zinc-500">·</span>
          <span>Priced Nov 18 @ $83.00/sh ($107.3B Gross / $104.8B Net)</span>
          <span className="text-zinc-500">·</span>
          <span className="text-[#da7756] font-mono">Day 1 High ${day1High.toFixed(2)} · Close ${day1Close.toFixed(2)} (+17.1%)</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-zinc-100">
          The Anthropic IPO, <br />
          <span className="bg-gradient-to-r from-[#da7756] via-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
            charted & traded
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-base text-zinc-400 sm:text-lg leading-relaxed">
          Anthropic, PBC is now public on the Nasdaq Global Select Market (<span className="text-zinc-100 font-mono font-semibold">ANT</span>).
          Extracted from the final <span className="text-zinc-200 font-medium">Form 424(b)(4) prospectus</span>:
          980M Class A shares priced at <span className="text-zinc-200 font-medium">$83.00/sh ($81.34B IPO)</span> +{" "}
          <span className="text-zinc-200 font-medium">$26.0B Class N private placement</span> ($104.8B net proceeds,{" "}
          <span className="text-zinc-200 font-medium">$232.35B pro forma cash</span>),{" "}
          <span className="text-zinc-200 font-medium">$33.24B 9M'26 revenue ($81B Oct run-rate)</span>, and{" "}
          <span className="text-zinc-200 font-medium">$900.9B in compute commitments</span>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#market"
            className="flex items-center gap-2 rounded-xl bg-[#da7756] px-5 py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
          >
            <TrendingUp size={16} />
            Live Nasdaq ANT (${stock.toFixed(2)} · {vsIpo >= 0 ? "+" : ""}{vsIpo.toFixed(1)}% vs IPO)
          </a>
          <a
            href="#news"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <Newspaper size={16} className="text-[#da7756]" />
            Debut & Settlement News
          </a>
          <a
            href="#trade"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <Calculator size={16} className="text-[#da7756]" />
            Trade Simulator & Valuation
          </a>
          <a
            href={SEC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <BookOpen size={16} className="text-[#da7756]" />
            424(b)(4) Final Prospectus
            <ExternalLink size={13} className="opacity-60" />
          </a>
          <a
            href={FWP_PRICING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <FileText size={16} className="text-amber-400" />
            Pricing Term Sheet (FWP)
            <ExternalLink size={13} className="opacity-60" />
          </a>
        </div>

        {/* Key Figures Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-xl border border-emerald-500/30 bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Nasdaq: ANT Live</div>
            <div className="mt-1 text-2xl font-bold tabular text-zinc-100">
              ${stock.toFixed(2)}
              <span className={`ml-1.5 text-xs font-mono ${vsIpo >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {vsIpo >= 0 ? "+" : ""}
                {vsIpo.toFixed(1)}%
              </span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              ${fdvT.toFixed(2)}T FD · ${basicCapT.toFixed(2)}T Basic
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">IPO + Private Net Proceeds</div>
            <div className="mt-1 text-2xl font-bold tabular text-[#da7756]">
              $104.8B
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              $232.35B Pro Forma Cash
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">9M'26 Revenue ($81B Oct)</div>
            <div className="mt-1 text-2xl font-bold tabular text-emerald-400">
              $33.24B
            </div>
            <div className="mt-1 text-[11px] text-emerald-500/80 font-mono">
              +1,880% YoY · $16.95B Q3'26
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Compute Commitments</div>
            <div className="mt-1 text-2xl font-bold tabular text-amber-400">
              $900.9B
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              $598.1B min · Google/AWS/MSFT
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Governance</div>
            <div className="mt-1 text-2xl font-bold tabular text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck size={20} className="text-[#da7756]" /> PBC + LTBT
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              50.1% Class F · 4/7 LTBT Board
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
