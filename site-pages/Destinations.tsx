import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";

function Destinations() {
  return (
    <section className="section-padding">
      <div className="container-main">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Destinations
          </p>

          <h1 className="mt-2 text-4xl font-black text-dark">
            Explore Popular Destinations
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">Explore airport options, local highlights and seasonal planning tips before choosing your travel dates.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}
        </div>

      </div>
    </section>
  );
}

export default Destinations;
