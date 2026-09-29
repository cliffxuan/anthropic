import { useState, useEffect } from "react";
import { usePrices } from "../usePrices";
import { Sparkles, TrendingUp, ExternalLink, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "#top" },
  { label: "Live Market", href: "#market" },
  { label: "Trade IPO", href: "#trade" },
  { label: "Timeline", href: "#track" },
  { label: "S-1 Offering", href: "#ipo" },
  { label: "Financials", href: "#financials" },
  { label: "Segments", href: "#segments" },
  { label: "Compute ($518B)", href: "#compute" },
  { label: "Governance & LTBT", href: "#governance" },
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

  const price = px?.latest.price ?? 2041.5;
  const change = px?.latest.day_change_pct ?? 0.0;
  const isUp = change >= 0;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-[#292624] bg-[#0d0c0b]/90 backdrop-blur-md shadow-lg shadow-black/40"
          : "border-b border-transparent bg-[#0d0c0b]/50 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#da7756] to-[#b45309] shadow-sm shadow-[#da7756]/30">
            <Sparkles size={16} className="text-[#0d0c0b]" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-zinc-100 flex items-center gap-1.5">
              ANTH <span className="text-[11px] font-normal text-zinc-400">· Anthropic IPO</span>
            </span>
          </div>
        </a>

        {/* Live Ticker Chip */}
        <a
          href="#market"
          className="hidden md:flex items-center gap-2 rounded-full border border-[#2a2624] bg-[#161413] px-3 py-1 text-xs transition hover:border-[#da7756]/50"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-mono text-zinc-400">io:ANTH</span>
          <span className="font-semibold tabular text-zinc-100">${price.toFixed(2)}</span>
          <span className={`font-mono text-[11px] ${isUp ? "text-emerald-400" : "text-red-400"}`}>
            {isUp ? "+" : ""}{change.toFixed(2)}%
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">~$2.04T cap</span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-5 text-xs text-zinc-400">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[#da7756]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://app.hyperliquid.xyz/trade/io:ANTH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-[#da7756] px-3.5 py-1.5 text-xs font-medium text-[#0d0c0b] transition hover:bg-[#e0896b] shadow-sm shadow-[#da7756]/20"
          >
            <TrendingUp size={13} />
            Trade io:ANTH
            <ExternalLink size={11} className="opacity-70" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-1.5 text-zinc-400 hover:text-zinc-100"
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
                <span className="font-mono text-zinc-300">io:ANTH Live</span>
              </div>
              <span className="font-semibold tabular text-zinc-100">${price.toFixed(2)}</span>
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
              href="https://app.hyperliquid.xyz/trade/io:ANTH"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#da7756] py-2 text-xs font-semibold text-[#0d0c0b]"
            >
              <TrendingUp size={14} /> Trade on Hyperliquid
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
