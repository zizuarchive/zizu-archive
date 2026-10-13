import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
export const metadata: Metadata = { title: "About", description: "The creative perspective behind ZIZU.archive." };
export default function About() {
  return (
    <section className="s two">
      <h1 className="h">About</h1>
      <div>{site.about.map((t) => <p key={t} className="lead" data-scrub>{t}</p>)}<Link className="more" href="/contact">Work with me ↗</Link></div>
    </section>
  );
}
