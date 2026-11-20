import { Sparkles, ExternalLink, ShieldCheck, TrendingUp, FileText } from "lucide-react";
import { SEC_URL, FWP_PRICING_URL, FWP_WEBSITE_URL, S1_URL } from "../data";

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
              <span className="font-semibold text-zinc-200">ANT · Nasdaq Listed</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Interactive primary-source breakdown of Anthropic, PBC's Form 424(b)(4) final prospectus (Nasdaq Global Select: ANT · CUSIP 03703U 107 · priced Nov 18, 2026 at $83.00/sh) and live Nasdaq + Hyperliquid perpetual market tracker.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono uppercase text-zinc-400 text-[11px] mb-3">SEC EDGAR Primary Filings</div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href={SEC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  <FileText size={11} className="text-[#da7756]" /> Form 424(b)(4) Final Prospectus <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href={FWP_PRICING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  Pricing Term Sheet FWP ($83.00/sh) <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href={FWP_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  IPO Factsheet & Founders' Letter FWP <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href={S1_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  Initial Form S-1 (Oct 24, 2026) <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          {/* Live Markets */}
          <div>
            <div className="font-mono uppercase text-zinc-400 text-[11px] mb-3">Live Markets & Tools</div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="https://app.hyperliquid.xyz/trade/xyz:ANT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  <TrendingUp size={11} className="text-[#da7756]" /> xyz:ANT ($/sh) on Hyperliquid <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://app.hyperliquid.xyz/trade/io:ANTH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#da7756] flex items-center gap-1"
                >
                  io:ANTH ($B FDV) on Hyperliquid <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-[#da7756]">
                  Post-IPO Trade Simulator & Workbench
                </a>
              </li>
              <li>
                <a href="#track" className="hover:text-[#da7756]">
                  9-Tranche Lock-up & SEC EDGAR Feed
                </a>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <div className="font-mono uppercase text-zinc-400 text-[11px] mb-3">Corporate Form</div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Anthropic, PBC is a Delaware Public Benefit Corporation (CIK 0002130357 · Reg. Nos. 333-299633 & 333-300148). Listed Nov 19, 2026 on Nasdaq Global Select under ticker <span className="font-mono text-zinc-200">ANT</span>.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#da7756]">
              <ShieldCheck size={14} /> Responsible Scaling Policy ASL-3 / ASL-4
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-[#262321] pt-6 text-[10px] text-zinc-600 leading-relaxed space-y-2">
          <p>
            DISCLAIMER: This application is an independent analytical tool for research, educational, and informational purposes only. It does not constitute an offer to buy or sell securities, nor an invitation to participate in any investment strategy. Perpetual futures contracts on Hyperliquid (xyz:ANT and io:ANTH) are synthetic derivatives settled in USDC and do not represent Class A equity ownership (Nasdaq: ANT) or stockholder voting rights in Anthropic, PBC.
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
