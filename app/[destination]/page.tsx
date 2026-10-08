import { notFound } from "next/navigation";
import { destinations, destinationPath, getDestination } from "@/data/destinations";
import DestinationPage from "@/components/DestinationPage";
import { destinationMetadata } from "@/utils/destination-seo";

type Props = { params: Promise<{ destination: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((destination) => ({ destination: destinationPath(destination).slice(1) }));
}

export async function generateMetadata({ params }: Props) {
  const destination = getDestination((await params).destination);
  if (!destination) notFound();
  return destinationMetadata(destination);
}

export default async function Page({ params }: Props) {
  const destination = getDestination((await params).destination);
  if (!destination) notFound();
  return <DestinationPage destination={destination} />;
}
