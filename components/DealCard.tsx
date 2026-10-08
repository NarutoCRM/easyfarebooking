import Link from "next/link";
import { ArrowUpRight, Globe, Clock3, Armchair, Repeat2, UsersRound, Plane } from "lucide-react";
import type { DealCategory, DealTone } from "@/data/deals";

const visuals = {
  domestic: { icon: Plane, label: "U.S. routes", background: "bg-light-blue", iconStyle: "bg-primary text-white", border: "border-primary/15" },
  international: { icon: Globe, label: "Across borders", background: "bg-dark", iconStyle: "bg-white/10 text-white", border: "border-dark" },
  urgent: { icon: Clock3, label: "Short-notice planning", background: "bg-amber-50", iconStyle: "bg-amber-100 text-amber-900", border: "border-amber-200" },
  premium: { icon: Armchair, label: "Cabin considerations", background: "bg-dark", iconStyle: "bg-amber-100 text-dark", border: "border-dark" },
  flexible: { icon: Repeat2, label: "Your trip structure", background: "bg-slate-50", iconStyle: "bg-primary/10 text-primary", border: "border-slate-200" },
  family: { icon: UsersRound, label: "Plan the whole visit", background: "bg-green/5", iconStyle: "bg-green/10 text-green", border: "border-green/20" },
} satisfies Record<DealTone, { icon: typeof Plane; label: string; background: string; iconStyle: string; border: string }>;

export default function DealCard({ deal }: { deal: DealCategory }) {
  const visual = visuals[deal.tone];
  const Icon = visual.icon;
  const dark = deal.tone === "premium" || deal.tone === "international";
  return (
    <Link href={deal.path} className={`group flex h-full min-w-0 flex-col rounded-2xl border p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none ${visual.background} ${visual.border} ${dark ? "text-white" : "text-dark"}`}>
      <div className="flex items-start justify-between gap-3"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${visual.iconStyle}`}><Icon aria-hidden="true" className="h-6 w-6" /></span><span className={`text-right text-[10px] font-bold uppercase tracking-widest ${dark ? "text-white/65" : "text-gray-500"}`}>{visual.label}</span></div>
      <p className={`mt-6 text-xs font-semibold ${dark ? "text-white/70" : "text-primary"}`}>{deal.eyebrow}</p>
      <h3 className="mt-2 text-xl font-black leading-tight">{deal.title}</h3>
      <p className={`mt-3 flex-1 text-sm leading-7 ${dark ? "text-white/80" : "text-gray-600"}`}>{deal.summary}</p>
      <span className={`mt-6 flex items-center justify-between gap-3 border-t pt-4 text-sm font-bold ${dark ? "border-white/15" : "border-dark/10"}`}>Explore flight options<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" /></span>
    </Link>
  );
}
