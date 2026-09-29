import { useState, useEffect } from "react";

export interface FilingItem {
  form: string;
  filed: string;
  description: string;
  status: string;
  public_expected: string;
  url: string;
}

export interface FilingsPayload {
  company: string;
  cik: string;
  source: string;
  filings: FilingItem[];
  updated: number;
}

export function useFilings() {
  const [data, setData] = useState<FilingsPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchFilings = async () => {
      try {
        const res = await fetch("/api/filings");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setErr(null);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e.message || "Failed to fetch filings");
      }
    };

    fetchFilings();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, err };
}
