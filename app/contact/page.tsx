import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/content/site";
export const metadata: Metadata = { title: "Contact", description: `Enquire about a project with ${site.business}.` };
export default function Contact() {
  return (
    <section className="s two">
      <div>
        <h1 className="h">Let&apos;s create something.</h1>
        <p><a className="more" href={`mailto:${site.email}`}>{site.email}</a></p>
        <p><a className="more" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><br /><a className="more" href={site.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a></p>
      </div>
      <ContactForm />
    </section>
  );
}
