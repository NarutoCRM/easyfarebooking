"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Copy } from "lucide-react";
import { appData } from "@/data";
import { emailDraftLink, inquiryStorageKey, parsePendingInquiry, serviceFromQuery, serviceSubject, validateContact, type ContactValues } from "@/utils/service-inquiry";

const topics = ["General Travel Question", "New Flight Booking", "Existing Reservation", "Flight Change or Cancellation", "Refund Assistance", "Hotels Planning Inquiry", "Cruise Planning Inquiry", "Car Rental Planning Inquiry", "Other"];
const controlClass = "w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-dark outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

export default function ContactInquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", phone: "", subject: topics[0], message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [review, setReview] = useState<ContactValues | null>(null);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState("");
  useEffect(() => {
    const service = serviceFromQuery(window.location.search);
    if (service) setValues((current) => ({ ...current, subject: serviceSubject(service) }));
    try {
      const raw = sessionStorage.getItem(inquiryStorageKey);
      const draft = parsePendingInquiry(raw);
      if (raw) sessionStorage.removeItem(inquiryStorageKey);
      if (draft && (!service || draft.service === service)) {
        setValues({ name: draft.name, email: draft.email, phone: draft.phone, subject: serviceSubject(draft.service), message: draft.message });
        setNote("Your planning inquiry is ready to review. Nothing has been sent or reserved.");
      } else if (raw) setNote("The carried request has expired or could not be restored. Enter the details below; nothing has been sent.");
    } catch { setNote("Enter your inquiry below. Browser storage is unavailable; nothing has been sent."); }
  }, []);
  useEffect(() => { if (review) draftRef.current?.focus(); }, [review]);
  const setValue = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setReview(null);
    setCopied("");
  };
  const props = (field: keyof ContactValues) => ({ id: `contact-${field}`, name: field, value: values[field], "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `contact-${field}-error` : undefined, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValue(field, event.target.value), className: controlClass });
  const label = (field: keyof ContactValues, text: string) => <label htmlFor={`contact-${field}`} className="mb-2 block text-xs font-bold text-gray-600">{text}</label>;
  const error = (field: keyof ContactValues) => errors[field] && <p id={`contact-${field}-error`} className="mt-2 text-xs text-red-700">{errors[field]}</p>;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContact(values);
    setErrors(validation);
    const first = Object.keys(validation)[0];
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    setReview({ ...values });
  };
  const copyDraft = async () => {
    if (!review) return;
    try { await navigator.clipboard.writeText(`${review.subject}\n\nName: ${review.name}\nEmail: ${review.email}\n${review.phone ? `Phone: ${review.phone}\n` : ""}\n${review.message}`); setCopied("Draft copied. It has not been sent."); }
    catch { setCopied("Copy was unavailable. You can select the draft text below, open your email app or use the contact phone number."); }
  };
  return <>
    <p className="mb-5 rounded-xl bg-light-blue p-4 text-sm leading-6 text-gray-700">This site prepares an email draft. Review it, then send it in your email app. No request is submitted automatically.</p>
    {note && <p role="status" className="mb-5 text-sm leading-6 text-primary">{note}</p>}
    <form ref={formRef} onSubmit={submit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>{label("name", "Full Name")}<input {...props("name")} type="text" autoComplete="name" maxLength={100} required />{error("name")}</div>
        <div>{label("email", "Email Address")}<input {...props("email")} type="email" autoComplete="email" maxLength={254} required />{error("email")}</div>
      </div>
      <div className="mt-5">{label("phone", "Phone Number (optional)")}<input {...props("phone")} type="tel" autoComplete="tel" maxLength={40} />{error("phone")}</div>
      <div className="mt-5">{label("subject", "What Can We Help You With?")}<select {...props("subject")}>{topics.map((topic) => <option key={topic}>{topic}</option>)}</select>{error("subject")}</div>
      <div className="mt-5">{label("message", "Your Message")}<textarea {...props("message")} rows={6} maxLength={2000} placeholder="Tell us about your travel plans..." required />{error("message")}</div>
      {Object.values(errors).some(Boolean) && <p role="alert" className="mt-4 text-sm text-red-700">Please correct the highlighted fields before preparing the draft.</p>}
      <button type="submit" className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-white transition hover:bg-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Review Email Draft<ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      <p className="mt-4 text-xs leading-6 text-gray-500">Only include the details needed for your inquiry. <Link href="/privacy-policy" className="font-semibold text-primary underline">Privacy information</Link></p>
    </form>
    {review && <div ref={draftRef} tabIndex={-1} className="mt-6 rounded-2xl border border-primary/20 bg-light-blue p-5 focus-visible:outline-2 focus-visible:outline-primary">
      <h3 className="font-black text-dark">Your email draft — not sent</h3><p className="mt-2 text-xs leading-6 text-gray-600">Opening a draft does not send it. If no email app is available, copy these details and email {appData.email}, or use the contact phone number.</p>
      <div className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-white p-4 text-sm leading-7 text-gray-700"><p className="font-bold">{review.subject}</p><p>{review.name} · {review.email}</p>{review.phone && <p>{review.phone}</p>}<p className="mt-3">{review.message}</p></div>
      <div className="mt-4 flex flex-wrap gap-3"><a href={emailDraftLink(review, appData.email)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-dark"><Mail aria-hidden="true" className="h-4 w-4" />Open Email Draft</a><button type="button" onClick={copyDraft} className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm font-bold text-primary"><Copy aria-hidden="true" className="h-4 w-4" />Copy Details</button></div>
      {copied && <p role="status" className="mt-3 text-xs leading-6 text-gray-600">{copied}</p>}
    </div>}
  </>;
}
