import data from "@/data/airports.json";

export type Airport = (typeof data)[number] & { code: string };

// This dataset uses iata, name, city, country and icao.
export const airports: Airport[] = data
  .map((airport) => ({ ...airport, code: airport.iata.trim().toUpperCase() }))
  .filter((airport) => /^[A-Z]{3}$/.test(airport.code));

export const findAirport = (code: string) =>
  airports.find((airport) => airport.code === code.trim().toUpperCase());
