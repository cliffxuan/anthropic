import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  blurb?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, blurb, sourceUrl, sourceLabel, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#da7756]">
              {eyebrow}
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-zinc-100">
              {title}
            </h2>
            {blurb && (
              <p className="mt-3 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed">{blurb}</p>
            )}
          </div>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-800 bg-[#161514] px-3.5 py-1.5 text-xs text-zinc-300 transition hover:border-[#da7756]/50 hover:bg-[#1f1d1b] hover:text-[#da7756]"
            >
              {sourceLabel || "Source: S-1 / SEC"}
              <ExternalLink size={12} className="opacity-60 group-hover:opacity-100" />
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[#262321] bg-gradient-to-b from-[#171514]/90 to-[#100e0d]/90 p-6 backdrop-blur shadow-lg shadow-black/40 ${className}`}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  accent = "text-zinc-100",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="text-xs uppercase tracking-wider text-zinc-500 font-mono">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tabular sm:text-3xl ${accent}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-400 leading-normal">{sub}</div>}
    </div>
  );
}

export function SourceLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-[#da7756] underline decoration-[#da7756]/40 underline-offset-2 transition hover:text-[#f08c6c] ${className}`}
    >
      {children}
      <ExternalLink size={11} />
    </a>
  );
}
