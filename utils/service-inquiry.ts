import { cruiseRegions, vehicleTypes, isServiceKind, services, type ServiceKind } from "@/data/services";

export type InquiryValues = {
  destination: string; startDate: string; endDate: string; travellers: string; rooms: string;
  preference: string; name: string; email: string; phone: string;
};
export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;
export type PendingInquiry = { version: 1; service: ServiceKind; createdAt: number; message: string; name: string; email: string; phone: string };
export const inquiryStorageKey = "easyfarebooking:pending-service-inquiry:v1";
export const inquiryLifetime = 30 * 60 * 1000;
export const emptyInquiry: InquiryValues = { destination: "", startDate: "", endDate: "", travellers: "2", rooms: "1", preference: "", name: "", email: "", phone: "" };

export function localToday(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export const validDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
export const validEmail = (email: string) => email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validPhone = (phone: string) => !phone || (phone.length <= 40 && /^[+\d\s().-]+$/.test(phone) && phone.replace(/\D/g, "").length >= 6 && phone.replace(/\D/g, "").length <= 20);

export function validateInquiry(service: ServiceKind, values: InquiryValues, today = localToday()): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.destination.trim() || values.destination.trim().length > 120) errors.destination = service === "car-rental" ? "Enter a pickup location (up to 120 characters)." : "Enter a destination (up to 120 characters).";
  if (!validDate(values.startDate) || values.startDate < today) errors.startDate = "Choose a valid date on or after today.";
  if (service !== "cruise" && (!validDate(values.endDate) || (service === "hotels" ? values.endDate <= values.startDate : values.endDate < values.startDate))) errors.endDate = service === "hotels" ? "Check-out must be after check-in." : "Return cannot be before pickup. Add times on Contact for a same-day rental.";
  const count = (value: string, max: number) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= max;
  if (service !== "car-rental" && !count(values.travellers, 50)) errors.travellers = "Enter between 1 and 50 travellers.";
  if (service === "hotels" && (!count(values.rooms, 20) || Number(values.rooms) > Number(values.travellers))) errors.rooms = "Enter 1–20 rooms, with no more rooms than guests.";
  if (service === "cruise") {
    if (!cruiseRegions.includes(values.destination)) errors.destination = "Choose a preferred cruise region.";
    if (!values.name.trim() || values.name.trim().length > 100) errors.name = "Enter your name (up to 100 characters).";
    if (!validEmail(values.email.trim())) errors.email = "Enter a valid email address.";
    if (!validPhone(values.phone.trim())) errors.phone = "Enter a valid phone number, or leave it blank.";
  }
  if (service === "car-rental" && !vehicleTypes.includes(values.preference)) errors.preference = "Choose a vehicle category.";
  return errors;
}

export function prepareInquiry(service: ServiceKind, values: InquiryValues, createdAt = Date.now()): PendingInquiry {
  const lines = service === "hotels" ? ["Accommodation planning inquiry", `Destination: ${values.destination.trim()}`, `Check-in: ${values.startDate}`, `Check-out: ${values.endDate}`, `Guests: ${values.travellers}`, `Rooms: ${values.rooms}`]
    : service === "cruise" ? ["Cruise planning inquiry", `Preferred region: ${values.destination}`, `Approximate departure: ${values.startDate}`, `Travellers: ${values.travellers}`]
    : ["Car rental planning inquiry", `Pickup location: ${values.destination.trim()}`, `Pickup date: ${values.startDate}`, `Return date: ${values.endDate}`, `Vehicle preference: ${values.preference}`];
  lines.push("", "This is a planning inquiry, not a confirmed reservation. Please help me review options and the actual provider's terms.");
  return { version: 1, service, createdAt, message: lines.join("\n"), name: service === "cruise" ? values.name.trim() : "", email: service === "cruise" ? values.email.trim() : "", phone: service === "cruise" ? values.phone.trim() : "" };
}

export function parsePendingInquiry(raw: string | null, now = Date.now()): PendingInquiry | null {
  try {
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const draft = value as Record<string, unknown>;
    if (draft.version !== 1 || !isServiceKind(draft.service) || typeof draft.createdAt !== "number" || !Number.isFinite(draft.createdAt) || draft.createdAt > now || now - draft.createdAt > inquiryLifetime) return null;
    if (typeof draft.message !== "string" || !draft.message.trim() || draft.message.length > 2000 || typeof draft.name !== "string" || draft.name.length > 100 || typeof draft.email !== "string" || (draft.email !== "" && !validEmail(draft.email)) || typeof draft.phone !== "string" || !validPhone(draft.phone)) return null;
    return draft as PendingInquiry;
  } catch { return null; }
}

export function contactInquiryPath(service: ServiceKind) {
  // Only a public service identifier goes in the URL. Request and contact details
  // are carried in one-use, expiring browser-session storage.
  return `/contact?service=${service}`;
}
export function serviceFromQuery(query: string): ServiceKind | "" {
  const value = new URLSearchParams(query).get("service");
  return isServiceKind(value) ? value : "";
}

export type ContactValues = { name: string; email: string; phone: string; subject: string; message: string };
export function validateContact(values: ContactValues) {
  const errors: Partial<Record<keyof ContactValues, string>> = {};
  if (!values.name.trim() || values.name.trim().length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (!validEmail(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!validPhone(values.phone.trim())) errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!values.subject.trim() || values.subject.length > 100 || /[\r\n]/.test(values.subject)) errors.subject = "Choose a request topic.";
  if (!values.message.trim() || values.message.length > 2000) errors.message = "Enter a message (up to 2,000 characters).";
  return errors;
}
export function emailDraftLink(values: ContactValues, recipient: string) {
  const body = [`Name: ${values.name.trim()}`, `Email: ${values.email.trim()}`, ...(values.phone.trim() ? [`Phone: ${values.phone.trim()}`] : []), "", values.message.trim()].join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(`Travel inquiry: ${values.subject.trim()}`)}&body=${encodeURIComponent(body)}`;
}
export const serviceSubject = (service: ServiceKind) => `${services[service].label} Planning Inquiry`;
