import { useState, useEffect } from "react";

export interface CandlePoint {
  date: string;
  perp: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export interface PricePayload {
  coin: string;
  source: string;
  target_valuation_t: number;
  target_share_price: number;
  series_h_valuation_t: number;
  shares_outstanding: number;
  series: CandlePoint[];
  latest: {
    price: number;
    prev_close: number;
    day_change_pct: number;
    implied_valuation_t: number;
    vs_series_h_pct: number;
    vs_target_pct: number;
  };
  trade_url: string;
  updated: number;
}

export function pctChange(current: number | null | undefined, base: number | null | undefined): number | null {
  if (current == null || base == null || base === 0) return null;
  return ((current - base) / base) * 100;
}

export function usePrices() {
  const [data, setData] = useState<PricePayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setErr(null);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e.message || "Failed to fetch prices");
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, err };
}
