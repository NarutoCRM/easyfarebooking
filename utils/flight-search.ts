import type { Airport } from "./airports";

export type FlightSearchValues = {
  from: Airport | null;
  to: Airport | null;
  departure: string;
  returnDate: string;
  tripType: string;
  travellers: number;
  cabin: string;
};

export function validateFlightSearch(values: FlightSearchValues): string {
  if (!values.from?.code || !values.to?.code) return "Please select departure and destination airports.";
  if (values.from.code === values.to.code) return "Departure and destination airports cannot be the same.";
  if (!values.departure) return "Please select your departure date.";
  if (values.tripType === "roundtrip" && !values.returnDate) return "Please select your return date.";
  if (values.tripType === "roundtrip" && values.returnDate < values.departure) return "Return date cannot be before departure date.";
  if (!Number.isInteger(values.travellers) || values.travellers < 1) return "Please select at least one traveller.";
  return "";
}

export function flightSearchParams(values: FlightSearchValues): URLSearchParams {
  const params = new URLSearchParams({
    from: values.from!.code,
    to: values.to!.code,
    departure: values.departure,
    tripType: values.tripType,
    travellers: String(values.travellers),
    cabin: values.cabin,
  });
  if (values.tripType === "roundtrip") params.set("return", values.returnDate);
  return params;
}
