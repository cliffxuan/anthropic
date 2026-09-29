import { Section, Card, SourceLink } from "./Section";
import { Scale, FileText, ShieldAlert, CheckCircle2 } from "lucide-react";

export function Litigation() {
  return (
    <Section
      id="litigation"
      eyebrow="Section 09 · Legal Proceedings"
      title="Intellectual Property & Litigation Exposure"
      blurb="Analysis of ongoing copyright litigation, fair use jurisprudence for neural network pre-training, and antitrust scrutiny around hyperscaler alliances."
      sourceUrl="https://www.sec.gov/edgar/searchedgar/companysearch"
      sourceLabel="S-1 · Legal Proceedings"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-amber-500 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
            <Scale size={16} /> Music Publishers v. Anthropic
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            Concord Music Group, UMG, ABKCO (MD TN / ND CA)
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Major music publishers brought suit alleging that Anthropic ingested copyrighted song lyrics into its training dataset and that early versions of Claude could output near-verbatim lyrics upon prompt jailbreaks.
          </p>
          <div className="rounded-lg border border-[#2a2624] bg-[#12100f] p-3 text-xs space-y-1.5">
            <div className="font-semibold text-zinc-200">Defense Position:</div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Anthropic contends that training neural representations constitutes transformative, non-expressive computational use protected under the fair use doctrine (citing <em>Authors Guild v. Google</em>), and has implemented state-of-the-art guardrails preventing regurgitation.
            </p>
          </div>
        </Card>

        <Card className="border-l-4 border-l-cyan-500 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
            <ShieldAlert size={16} /> Regulatory & Antitrust Review
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            FTC 6(b) Cloud Partnership Inquiry
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            The Federal Trade Commission launched formal market inquiries examining cloud service provider investments in generative AI labs, focusing on Amazon AWS's $4.0B+ stake and Google's $2.0B+ stake in Anthropic.
          </p>
          <div className="rounded-lg border border-[#2a2624] bg-[#12100f] p-3 text-xs space-y-1.5">
            <div className="font-semibold text-zinc-200">Market Structure:</div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Anthropic maintains multi-cloud independence, offering Claude across AWS Bedrock, Google Cloud Vertex AI, and its direct Anthropic Console API, with neither cloud provider holding board voting control.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
