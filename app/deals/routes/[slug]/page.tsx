import { notFound } from "next/navigation";
import { routeDeals, getRouteDeal } from "@/data/deals";
import DealPage from "@/components/DealPage";
import { dealMetadata } from "@/utils/deal-seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return routeDeals.map((route) => ({ slug: route.slug })); }
const resolve = async (params: Props["params"]) => {
  const route = getRouteDeal((await params).slug);
  if (!route) notFound();
  return route;
};
export async function generateMetadata({ params }: Props) { return dealMetadata(await resolve(params)); }
export default async function Page({ params }: Props) { return <DealPage deal={await resolve(params)} />; }
