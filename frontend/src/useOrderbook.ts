import { useState, useEffect } from "react";

export interface OrderLevel {
  px: number;
  sz: number;
  n: number;
}

export interface OrderbookPayload {
  coin: string;
  best_bid: number;
  best_ask: number;
  mid: number;
  spread: number;
  bids: OrderLevel[];
  asks: OrderLevel[];
  updated: number;
}

export function useOrderbook() {
  const [data, setData] = useState<OrderbookPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchOrderbook = async () => {
      try {
        const res = await fetch("/api/orderbook");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setErr(null);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e.message || "Failed to fetch orderbook");
      }
    };

    fetchOrderbook();
    const interval = setInterval(fetchOrderbook, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, err };
}
