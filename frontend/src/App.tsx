import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Snapshot } from "./components/Snapshot";
import { PriceTracker } from "./components/PriceTracker";
import { TradeSimulator } from "./components/TradeSimulator";
import { Track } from "./components/Track";
import { IPOMechanics } from "./components/IPOMechanics";
import { Financials } from "./components/Financials";
import { Segments } from "./components/Segments";
import { Compute } from "./components/Compute";
import { Customers } from "./components/Customers";
import { Governance } from "./components/Governance";
import { Risks } from "./components/Risks";
import { Litigation } from "./components/Litigation";
import { Quotes } from "./components/Quotes";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let cancelled = false;
    const onUserScroll = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    const start = performance.now();
    const tick = () => {
      if (cancelled) return cleanup();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      if (performance.now() - start < 1500) {
        timer = window.setTimeout(tick, 150);
      } else {
        cleanup();
      }
    };

    let timer = window.setTimeout(tick, 0);
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
    return cleanup;
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#0d0c0b] text-zinc-100 selection:bg-[#da7756]/30 selection:text-white">
      <Nav />
      <Hero />
      <main>
        <Snapshot />
        <PriceTracker />
        <TradeSimulator />
        <Track />
        <IPOMechanics />
        <Financials />
        <Segments />
        <Compute />
        <Customers />
        <Governance />
        <Risks />
        <Litigation />
        <Quotes />
      </main>
      <Footer />
    </div>
  );
}
