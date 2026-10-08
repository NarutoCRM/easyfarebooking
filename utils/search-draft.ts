export const searchDraftKey = "easyfarebooking:flight-search:v1";
export type SearchDraft = { departure: string; returnDate: string; travellers: number; cabin: string; tripType?: "oneway" | "roundtrip" };
export const cabinOptions = ["Economy", "Premium Economy", "Business", "First Class"];

export function parseSearchDraft(raw: string | null): SearchDraft | null {
  if (!raw) return null;
  try {
    const draft: unknown = JSON.parse(raw);
    if (!draft || typeof draft !== "object") return null;
    const value = draft as Record<string, unknown>;
    const date = (item: unknown) => typeof item === "string" && (item === "" || (/^\d{4}-\d{2}-\d{2}$/.test(item) && !Number.isNaN(Date.parse(item)) && new Date(item).toISOString().slice(0, 10) === item));
    if (!date(value.departure) || !date(value.returnDate) || typeof value.travellers !== "number" || !Number.isInteger(value.travellers) || value.travellers < 1 || value.travellers > 9 || typeof value.cabin !== "string" || !cabinOptions.includes(value.cabin)) return null;
    if (value.tripType !== undefined && value.tripType !== "oneway" && value.tripType !== "roundtrip") return null;
    return { departure: value.departure as string, returnDate: value.returnDate as string, travellers: value.travellers, cabin: value.cabin, tripType: value.tripType as SearchDraft["tripType"] };
  } catch { return null; }
}
