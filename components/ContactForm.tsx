"use client";
import { useState } from "react";
import { categories } from "@/content/projects";
import { site } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "description", string>>;

export default function ContactForm() {
  // Stays in demo mode (sends nothing) until NEXT_PUBLIC_FORM_LIVE=true is set after the form has been set up and tested.
  const live = process.env.NEXT_PUBLIC_FORM_LIVE === "true";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "demo">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) errs.email = "Please enter a valid email address.";
    if (!data.description?.trim()) errs.description = "Please tell me a little about the project.";
    setErrors(errs);
    if (Object.keys(errs).length) { (e.currentTarget.elements.namedItem(Object.keys(errs)[0]) as HTMLElement | null)?.focus(); return; } // jump to the first problem
    if (!live) { setStatus("demo"); return; }
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) setStatus("sent"); else { setMsg(j.error ?? "Something went wrong."); setStatus("failed"); }
    } catch { setMsg("Could not reach the server."); setStatus("failed"); }
  }

  if (status === "demo") return <p className="ok" role="status">Demo only: nothing was sent. Please email <a href={`mailto:${site.email}`}>{site.email}</a> directly.</p>;
  if (status === "sent") return <p className="ok" role="status">Thank you. Your enquiry has been sent and I will reply by email.</p>;
  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {!live && <p className="small demo">Demo mode: this form is not connected yet and will not send anything. Please email {site.email} directly.</p>}
      <label>Full name *<input name="name" autoComplete="name" aria-invalid={!!errors.name} />{errors.name && <em className="err">{errors.name}</em>}</label>
      <label>Email address *<input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />{errors.email && <em className="err">{errors.email}</em>}</label>
      <label>Type of project
        <select name="type" defaultValue="Other">{[...categories, "Other"].map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Budget range (optional)
        <select name="budget" defaultValue=""><option value="">Not sure yet</option><option>Under £250</option><option>£250 – £500</option><option>£500 – £1,000</option><option>£1,000+</option></select></label>
      <label className="wide">Project description *<textarea name="description" rows={6} aria-invalid={!!errors.description} />{errors.description && <em className="err">{errors.description}</em>}</label>
      <label>Preferred timeline (optional)<input name="timeline" placeholder="e.g. end of next month" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <button className="btn" disabled={status === "sending"}>{status === "sending" ? "SENDING…" : live ? "SEND ENQUIRY ↗" : "SEND (DEMO) ↗"}</button>
      {status === "failed" && <p className="err" role="alert">{msg} You can also email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>}
      <p className="small">Your details are used only to reply to this enquiry and are not shared or sold.</p>
    </form>
  );
}
