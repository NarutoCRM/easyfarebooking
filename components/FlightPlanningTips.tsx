import { Check } from "lucide-react";
import { flightPlanningTips } from "@/data/deals";

export default function FlightPlanningTips() {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{flightPlanningTips.map((tip) => (
    <article key={tip.title} className="rounded-2xl border border-gray-200 bg-white p-5">
      <Check aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-3 font-bold text-dark">{tip.title}</h3><p className="mt-3 text-sm leading-7 text-gray-600">{tip.text}</p>
    </article>
  ))}</div>;
}
