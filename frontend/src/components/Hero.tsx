import { usePrices } from "../usePrices";
import { Sparkles, TrendingUp, BookOpen, Calculator, ShieldCheck } from "lucide-react";

export function Hero() {
  const { data: px } = usePrices();

  const price = px?.latest.price ?? 2041.5;
  const valuationT = px?.latest.implied_valuation_t ?? 2.04;
  const vsSeriesH = px?.latest.vs_series_h_pct ?? 111.5;

  return (
    <div className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 anthropic-bg border-b border-[#262321]">
      <div className="mx-auto max-w-6xl px-5">
        {/* Top Status Banner */}
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#38332f] bg-[#1a1715]/80 px-3.5 py-1.5 text-xs text-zinc-300 backdrop-blur">
          <span className="flex h-2 w-2 rounded-full bg-[#da7756] pulse-dot" />
          <span className="font-semibold text-zinc-100">Confidential Form S-1</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-300">Submitted June 1, 2026 (JOBS Act)</span>
          <span className="text-zinc-500">·</span>
          <span className="text-[#da7756] font-mono font-medium">Expected Roadshow Nov 2026</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-zinc-100">
          The Anthropic IPO, <br />
          <span className="bg-gradient-to-r from-[#da7756] via-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
            charted & traded
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-base text-zinc-400 sm:text-lg leading-relaxed">
          Primary-source breakdown of Anthropic PBC's confidential S-1 registration statement:
          a twelvefold revenue surge to <span className="text-zinc-200 font-medium">$4.62B in 2025</span>,{" "}
          <span className="text-zinc-200 font-medium">$518 billion</span> in hyperscaler compute commitments,
          the revolutionary <span className="text-zinc-200 font-medium">Long-Term Benefit Trust</span>, and real-time
          pre-IPO perpetual trading on Hyperliquid.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#market"
            className="flex items-center gap-2 rounded-xl bg-[#da7756] px-5 py-3 text-sm font-semibold text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-lg shadow-[#da7756]/20"
          >
            <TrendingUp size={16} />
            Live Pre-IPO Market & Chart
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
            Explore S-1 Mechanics
          </a>
        </div>

        {/* Key Figures Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Live Implied Cap</div>
            <div className="mt-1 text-2xl font-bold tabular text-[#da7756]">
              ${valuationT.toFixed(2)}T
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              ${price.toFixed(2)}/pt · Hyperliquid
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">2025 Revenue</div>
            <div className="mt-1 text-2xl font-bold tabular text-emerald-400">
              $4.62B
            </div>
            <div className="mt-1 text-[11px] text-emerald-500/80 font-mono">
              +1,180% YoY (12× growth)
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Compute Commitments</div>
            <div className="mt-1 text-2xl font-bold tabular text-amber-400">
              $518B
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              AWS Trainium & GCP TPUs
            </div>
          </div>

          <div className="rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Series H Round</div>
            <div className="mt-1 text-2xl font-bold tabular text-zinc-200">
              $965B
            </div>
            <div className="mt-1 text-[11px] text-[#da7756] font-mono">
              +{vsSeriesH.toFixed(1)}% vs. May 2026
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#2a2624] bg-[#141211]/90 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Governance</div>
            <div className="mt-1 text-2xl font-bold tabular text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck size={20} className="text-[#da7756]" /> PBC + LTBT
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 font-mono">
              Delaware Purpose Trust
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
