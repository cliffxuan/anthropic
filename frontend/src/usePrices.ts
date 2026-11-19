import { useState, useEffect } from "react";

export interface CandlePoint {
  date: string;
  perp: number | null;
  perp_share?: number | null;
  xyz?: number | null;
  stock?: number | null;
  stock_val?: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number;
}

export interface NasdaqQuote {
  symbol: string;
  exchange: string;
  market_status: string;
  last_sale: number | null;
  bid: number | null;
  ask: number | null;
  volume: string | null;
  is_trading: boolean;
}

export interface PricePayload {
  coin: string;
  ipo_price?: number;
  listing_date?: string;
  source: string;
  perp_source?: string;
  stock_source?: string;
  target_valuation_t: number;
  target_share_price: number;
  midpoint_share_price?: number;
  series_h_valuation_t: number;
  shares_outstanding: number;
  basic_shares_outstanding?: number;
  series: CandlePoint[];
  latest: {
    price: number;
    prev_close: number;
    day_change_pct: number;
    implied_valuation_t: number;
    implied_share_price_fd?: number;
    vs_series_h_pct: number;
    vs_target_pct: number;
    vs_s1a_mid_pct?: number;
    stock?: number | null;
    stock_prev?: number | null;
  };
  nasdaq_quote?: NasdaqQuote;
  xyz_ant?: {
    coin: string;
    price: number;
    prev_close: number;
    day_change_pct: number;
    implied_fdv_t: number;
    implied_basic_cap_t: number;
    vs_s1a_top_pct: number;
    vs_s1a_mid_pct: number;
    trade_url: string;
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
