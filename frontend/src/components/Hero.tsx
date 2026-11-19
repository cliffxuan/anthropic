import { usePrices } from "../usePrices";
import { TrendingUp, BookOpen, Calculator, ShieldCheck, Newspaper } from "lucide-react";

export function Hero() {
  const { data: px } = usePrices();

  const price = px?.latest.price ?? 1811.8;
  const valuationT = px?.latest.implied_valuation_t ?? 1.812;
  const impliedSharePx = px?.latest.implied_share_price_fd ?? Number((price / 18.07).toFixed(2));
  const xyzPrice = px?.xyz_ant?.price ?? 103.0;
  const vsSeriesH = px?.latest.vs_series_h_pct ?? 87.8;

  return (
    <div className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 anthropic-bg border-b border-[#262321]">
      <div className="mx-auto max-w-6xl px-5">
        {/* Top Status Banner */}
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#38332f] bg-[#1a1715]/80 px-3.5 py-1.5 text-xs text-zinc-300 backdrop-blur">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-semibold text-zinc-100">IPO Priced at $83.00 / sh ($1.50T FDV)</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-300">$81.34B IPO + $26B Private ($107.34B Raise)</span>
          <span className="text-zinc-500">·</span>
          <span className="text-[#da7756] font-mono font-medium">Nasdaq: ANT Debut Nov 19, 2026</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-zinc-100">
          The Anthropic IPO, <br />
          <span className="bg-gradient-to-r from-[#da7756] via-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
            charted & traded
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-base text-zinc-400 sm:text-lg leading-relaxed">
          Primary-source breakdown of Anthropic PBC's historic <span className="text-zinc-200 font-medium">$83.00/share IPO pricing ($1.50T FDV)</span>—the
          largest public offering in global history: <span className="text-zinc-200 font-medium">$81.34B across 980M Class A shares</span> plus a{" "}
          <span className="text-zinc-200 font-medium">$26.0B Class N private placement</span> ($107.34B total),{" "}
          <span className="text-zinc-200 font-medium">$33.2B in 9M 2026 revenue ($81B ARR)</span>, and live perpetual trading on Hyperliquid.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#market"
            className="flex items-center gap-2 rounded-xl bg-[#da7756] px-5 py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
          >
            <TrendingUp size={16} />
            Live Perp → Share Price (~${impliedSharePx.toFixed(0)}–${xyzPrice.toFixed(0)}/sh vs $83 IPO)
          </a>
          <a
            href="#news"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <Newspaper size={16} className="text-[#da7756]" />
            $83.00 Pricing & Debut News
          </a>
          <a
            href="#trade"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <Calculator size={16} className="text-[#da7756]" />
            Trade Simulator & Valuation Model
          </a>
          <a
            href="#ipo"
            className="flex items-center gap-2 rounded-xl border border-[#3a3532] bg-[#191716] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#da7756]/50 hover:bg-[#201d1b]"
          >
            <BookOpen size={16} className="text-[#da7756]" />
            $107.3B Offering Mechanics
          </a>
        </div>

        {/* Key Figures Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Perp Implied Share Px</div>
            <div className="mt-1 text-2xl font-bold tabular text-[#da7756]">
              ~${impliedSharePx.toFixed(0)}–${xyzPrice.toFixed(0)}/sh
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              ${valuationT.toFixed(2)}T cap vs $83.00 IPO
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">9M 2026 Revenue</div>
            <div className="mt-1 text-2xl font-bold tabular text-emerald-400">
              $33.2B
            </div>
            <div className="mt-1 text-[11px] text-emerald-500/80 font-mono">
              $81B Oct ARR · $4.59B FY25
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Total Capital Raised</div>
            <div className="mt-1 text-2xl font-bold tabular text-amber-400">
              $107.3B
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              $81.3B IPO + $26B Class N
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">IPO Valuation ($83/sh)</div>
            <div className="mt-1 text-2xl font-bold tabular text-zinc-200">
              $1.50T
            </div>
            <div className="mt-1 text-[11px] text-[#da7756] font-mono">
              +{vsSeriesH.toFixed(1)}% Perp vs Series H
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Governance</div>
            <div className="mt-1 text-2xl font-bold tabular text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck size={20} className="text-[#da7756]" /> PBC + LTBT
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              4/7 LTBT Board · 50.1% Class F
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
