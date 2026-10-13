import { site } from "@/content/site";

// Receives the form, checks it again on the server, and emails it using Resend.
// The secret key lives in the RESEND_API_KEY environment variable and never reaches the browser.
export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try { d = await req.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (d.website) return Response.json({ ok: true }); // hidden field filled in = bot; pretend success
  const s = (k: string, max: number) => String(d[k] ?? "").trim().slice(0, max);
  const name = s("name", 120), email = s("email", 200), description = s("description", 4000);
  if (!name || !description || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: "Please check the required fields." }, { status: 400 });
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "The form is not set up yet." }, { status: 503 });
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "ZIZU.archive <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `New enquiry (${s("type", 60) || "Other"}) from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${s("type", 60)}\nBudget: ${s("budget", 60) || "-"}\nTimeline: ${s("timeline", 200) || "-"}\n\n${description}`,
    }),
  });
  return r.ok ? Response.json({ ok: true }) : Response.json({ error: "Could not send your enquiry." }, { status: 502 });
}
