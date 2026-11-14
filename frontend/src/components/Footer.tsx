import { Sparkles, ExternalLink, ShieldCheck, TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#262321] bg-[#0a0908] py-16 text-xs text-zinc-500">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#da7756] to-[#b45309]">
                <Sparkles size={14} className="text-[#0d0c0b]" />
              </div>
              <span className="font-semibold text-zinc-200">ANT · Anthropic IPO</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Interactive primary-source breakdown of Anthropic PBC's Form S-1/A prospectus (Nasdaq: ANT) and live pre-IPO perpetual market tracker (Hyperliquid: io:ANTH).
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono uppercase text-zinc-400 text-[11px] mb-3">Primary Sources</div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="https://www.sec.gov/edgar/browse/?CIK=0002130357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  SEC EDGAR (CIK 0002130357) <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://app.hyperliquid.xyz/trade/io:ANTH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  Hyperliquid io:ANTH Perp <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://darioamodei.com/machines-of-loving-grace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  Machines of Loving Grace <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.anthropic.com/news/the-long-term-benefit-trust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  Long-Term Benefit Trust Charter <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          {/* Live Markets */}
          <div>
            <div className="font-mono uppercase text-zinc-400 text-[11px] mb-3">Live Trading</div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="https://app.hyperliquid.xyz/trade/io:ANTH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  <TrendingUp size={11} className="text-[#da7756]" /> io:ANTH on Hyperliquid
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-[#da7756]">
                  Nov 2026 Roadshow & News
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-[#da7756]">
                  IPO Trade Simulator & Workbench
                </a>
              </li>
              <li>
                <a href="#track" className="hover:text-[#da7756]">
                  Event Calendar & Lock-up
                </a>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <div className="font-mono uppercase text-zinc-400 text-[11px] mb-3">Corporate Form</div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Anthropic, PBC is a Delaware Public Benefit Corporation. Headquartered in San Francisco, CA. Nasdaq Global Select Ticker: <span className="font-mono text-zinc-200">ANT</span> ($70–$78/sh).
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#da7756]">
              <ShieldCheck size={14} /> Responsible Scaling Policy ASL-3 / ASL-4
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-[#262321] pt-6 text-[10px] text-zinc-600 leading-relaxed space-y-2">
          <p>
            DISCLAIMER: This application is an independent analytical tool for research, educational, and informational purposes only. It does not constitute an offer to buy or sell securities, nor an invitation to participate in any investment strategy. Pre-IPO perpetual contracts on Hyperliquid (io:ANTH) are synthetic derivatives settled in cryptocurrency (USDC) and do not represent Class A equity ownership (Nasdaq: ANT) or shareholder voting rights in Anthropic PBC.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-zinc-500">
            <span>Deployed at <a href="https://anthropic.algoentropy.com" className="text-zinc-400 hover:text-zinc-200">anthropic.algoentropy.com</a></span>
            <span>Built by <a href="https://algoentropy.com" className="text-zinc-400 hover:text-zinc-200">Algo Entropy</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
