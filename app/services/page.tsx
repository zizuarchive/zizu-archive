import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
export const metadata: Metadata = { title: "Services", description: `Videography, editing, photography and content creation from ${site.business}.` };
export default function Services() {
  return (
    <section className="s">
      <h1 className="h">{site.business}</h1>
      <ul className="rows">
        {site.services.map((s) => (
          <li key={s.title}><h2>{s.title}</h2><p>{s.text}</p>
            {(s.price || s.turnaround) && <small>{s.price} {s.turnaround && `· ${s.turnaround}`}</small>}</li>
        ))}
      </ul>
      <Link className="btn" href="/contact">ENQUIRE ABOUT A PROJECT ↗</Link>
    </section>
  );
}
