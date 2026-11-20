import { useState, useEffect } from "react";
import { usePrices } from "../usePrices";
import { Sparkles, TrendingUp, ExternalLink, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "News", href: "#news" },
  { label: "Market", href: "#market" },
  { label: "Trade", href: "#trade" },
  { label: "Timeline", href: "#track" },
  { label: "Offering", href: "#ipo" },
  { label: "Financials", href: "#financials" },
  { label: "Segments", href: "#segments" },
  { label: "Compute", href: "#compute" },
  { label: "Governance", href: "#governance" },
  { label: "Risks", href: "#risks" },
];

export function Nav() {
  const { data: px } = usePrices();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stock = px?.latest.stock ?? px?.xyz_ant?.price ?? 87.6;
  const vsIpo = px?.latest.stock_vs_ipo_pct ?? ((stock - 83.0) / 83.0) * 100;
  const isUp = vsIpo >= 0;
  const fdvT = px?.latest.stock_fdv_t ?? (stock * 18.138) / 1000;
  const xyzPrice = px?.xyz_ant?.price ?? stock;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-[#292624] bg-[#0d0c0b]/90 backdrop-blur-md shadow-lg shadow-black/40"
          : "border-b border-transparent bg-[#0d0c0b]/50 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        {/* Brand + Live Ticker Chip */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#top" className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#da7756] to-[#b45309] shadow-sm shadow-[#da7756]/30">
              <Sparkles size={16} className="text-[#0d0c0b]" />
            </div>
            <span className="font-semibold tracking-tight text-zinc-100 flex items-center gap-1.5 whitespace-nowrap">
              ANT <span className="text-[11px] font-normal text-zinc-400">· Nasdaq Listed</span>
            </span>
          </a>

          <a
            href="#market"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#2a2624] bg-[#161413] px-3 py-1 text-xs transition hover:border-[#da7756]/50 whitespace-nowrap shrink-0"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono text-zinc-400">NASDAQ: ANT</span>
            <span className="font-semibold tabular text-zinc-100">${stock.toFixed(2)}</span>
            <span className={`font-mono text-[11px] ${isUp ? "text-emerald-400" : "text-red-400"}`}>
              ({isUp ? "+" : ""}
              {vsIpo.toFixed(1)}% vs $83 IPO)
            </span>
            <span className="hidden 2xl:inline text-zinc-600">·</span>
            <span className="hidden 2xl:inline font-mono text-zinc-400">xyz:ANT</span>
            <span className="hidden 2xl:inline font-semibold tabular text-cyan-400">${xyzPrice.toFixed(2)}</span>
            <span className="hidden 2xl:inline text-zinc-500 font-mono text-[11px]">~${fdvT.toFixed(2)}T</span>
          </a>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-4 text-xs text-zinc-400 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[#da7756] whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="https://app.hyperliquid.xyz/trade/xyz:ANT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#da7756] px-3.5 py-1.5 text-xs font-medium text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-sm shadow-[#da7756]/20 whitespace-nowrap shrink-0"
          >
            <TrendingUp size={13} className="shrink-0" />
            <span>Trade xyz:ANT</span>
            <ExternalLink size={11} className="opacity-70 shrink-0" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-1.5 text-zinc-400 hover:text-zinc-100 shrink-0"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-b border-[#292624] bg-[#121110] px-5 py-4">
          <div className="flex flex-col gap-3">
            <a
              href="#market"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-lg border border-[#2a2624] bg-[#161413] p-2.5 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="font-mono text-zinc-300">NASDAQ: ANT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tabular text-zinc-100">${stock.toFixed(2)}</span>
                <span className={`font-mono ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                  {isUp ? "+" : ""}
                  {vsIpo.toFixed(1)}% vs IPO
                </span>
              </div>
            </a>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-sm text-zinc-300 hover:text-[#da7756]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://app.hyperliquid.xyz/trade/xyz:ANT"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#da7756] py-2 text-xs font-semibold text-[#0d0c0b]"
            >
              <TrendingUp size={14} /> Trade xyz:ANT on Hyperliquid
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
