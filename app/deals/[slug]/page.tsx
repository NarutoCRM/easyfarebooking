import { notFound } from "next/navigation";
import { dealCategories, getDealCategory } from "@/data/deals";
import DealPage from "@/components/DealPage";
import { dealMetadata } from "@/utils/deal-seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return dealCategories.filter((category) => category.path.startsWith("/deals/")).map((category) => ({ slug: category.id }));
}
const resolve = async (params: Props["params"]) => {
  const category = getDealCategory((await params).slug);
  if (!category || !category.path.startsWith("/deals/")) notFound();
  return category;
};
export async function generateMetadata({ params }: Props) { return dealMetadata(await resolve(params)); }
export default async function Page({ params }: Props) { return <DealPage deal={await resolve(params)} />; }
