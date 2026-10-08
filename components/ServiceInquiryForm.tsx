"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, Users, Ship, Car } from "lucide-react";
import { cruiseRegions, vehicleTypes, services, type ServiceKind } from "@/data/services";
import { contactInquiryPath, emptyInquiry, inquiryStorageKey, localToday, prepareInquiry, validateInquiry, type InquiryErrors, type InquiryValues } from "@/utils/service-inquiry";

const controlClass = "min-h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

export default function ServiceInquiryForm({ service }: { service: ServiceKind }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<InquiryValues>({ ...emptyInquiry, preference: service === "car-rental" ? "No preference" : "" });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [storageError, setStorageError] = useState("");
  const [continuing, setContinuing] = useState(false);
  const config = services[service];
  const Icon = service === "hotels" ? MapPin : service === "cruise" ? Ship : Car;
  const setValue = (field: keyof InquiryValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const fieldId = (field: keyof InquiryValues) => `${service}-${field}`;
  const fieldProps = (field: keyof InquiryValues) => ({ id: fieldId(field), name: field, value: values[field], "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `${fieldId(field)}-error` : undefined, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(field, event.target.value), className: controlClass });
  const label = (field: keyof InquiryValues, text: string) => <label htmlFor={fieldId(field)} className="mb-2 block text-xs font-bold text-slate-700">{text}</label>;
  const error = (field: keyof InquiryValues) => errors[field] && <p id={`${fieldId(field)}-error`} className="mt-2 text-xs text-red-700">{errors[field]}</p>;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (continuing) return;
    setStorageError("");
    const nextErrors = validateInquiry(service, values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    try {
      sessionStorage.setItem(inquiryStorageKey, JSON.stringify(prepareInquiry(service, values)));
    } catch {
      setStorageError("Your browser could not carry the request details to Contact. You can continue there and enter them directly. Nothing has been sent.");
      return;
    }
    setContinuing(true);
    router.push(contactInquiryPath(service));
  };

  return <div id="service-inquiry" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-dark/5 sm:p-7">
    <div className="mb-6 flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-blue text-primary"><Icon aria-hidden="true" className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-widest text-primary">Planning inquiry</p><h2 className="mt-1 text-xl font-black text-dark">{config.formTitle}</h2><p id={`${service}-form-help`} className="mt-3 text-sm leading-6 text-slate-500">{config.formDescription}</p></div></div>
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={`${service}-form-help`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">{label("destination", service === "car-rental" ? "Pickup location" : service === "cruise" ? "Preferred destination" : "Destination")}
          {service === "cruise" ? <select {...fieldProps("destination")} required><option value="">Choose a region</option>{cruiseRegions.map((region) => <option key={region}>{region}</option>)}</select> : <input {...fieldProps("destination")} type="text" placeholder={service === "hotels" ? "City, area or destination" : "City, airport or pickup address"} maxLength={120} required autoComplete="off" />}
          {error("destination")}
        </div>
        <div>{label("startDate", service === "hotels" ? "Check-in date" : service === "cruise" ? "Approximate departure date" : "Pickup date")}<div className="relative"><input {...fieldProps("startDate")} type="date" min={localToday()} required /></div>{error("startDate")}</div>
        {service !== "cruise" && <div>{label("endDate", service === "hotels" ? "Check-out date" : "Return date")}<input {...fieldProps("endDate")} type="date" min={values.startDate || localToday()} required />{error("endDate")}</div>}
        {service !== "car-rental" && <div>{label("travellers", service === "hotels" ? "Guests (total)" : "Number of travellers")}<input {...fieldProps("travellers")} type="number" min={1} max={50} step={1} required />{error("travellers")}</div>}
        {service === "hotels" && <div>{label("rooms", "Rooms")}<select {...fieldProps("rooms")} required>{Array.from({ length: 20 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index === 0 ? "room" : "rooms"}</option>)}</select>{error("rooms")}</div>}
        {service === "car-rental" && <div className="sm:col-span-2">{label("preference", "Preferred vehicle type")}<select {...fieldProps("preference")} required>{vehicleTypes.map((vehicle) => <option key={vehicle}>{vehicle}</option>)}</select>{error("preference")}</div>}
        {service === "cruise" && <>
          <div className="sm:col-span-2 border-t border-slate-100 pt-5"><p className="text-sm font-bold text-dark">Contact details for your draft</p><p className="mt-2 text-xs leading-5 text-slate-500">Carried privately to Contact for review. This site will not send your request automatically.</p></div>
          <div>{label("name", "Full name")}<input {...fieldProps("name")} type="text" autoComplete="name" maxLength={100} required />{error("name")}</div>
          <div>{label("email", "Email address")}<input {...fieldProps("email")} type="email" autoComplete="email" maxLength={254} required />{error("email")}</div>
          <div className="sm:col-span-2">{label("phone", "Phone number (optional)")}<input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={40} />{error("phone")}</div>
        </>}
      </div>
      {Object.values(errors).some(Boolean) && <p role="alert" className="mt-5 text-sm text-red-700">Please correct the highlighted fields before continuing.</p>}
      {storageError && <div role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">{storageError}<Link href={contactInquiryPath(service)} className="mt-2 block font-bold underline">Continue to Contact without transferring details</Link></div>}
      <button type="submit" disabled={continuing} className="mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70">{continuing ? "Opening your inquiry..." : "Continue to Contact"}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></button>
      <p className="mt-4 text-xs leading-6 text-slate-500">This prepares an inquiry, not a reservation. Request details stay in this browser session until Contact opens, or expire after 30 minutes.</p>
      <div aria-hidden="true" className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-400"><span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" />Your dates</span><span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />Your preferences</span></div>
    </form>
  </div>;
}
