"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function Wordmark() {
  return <span className="wm" aria-label={site.name}><b>ZIZU</b><i>.archive</i></span>;
}
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Marks the page you are on (underline stays drawn).
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  const on = path === href || path.startsWith(href + "/");
  return <Link href={href} aria-current={on ? "page" : undefined}>{children}</Link>;
}

export function Header() {
  return (
    <header className="top">
      <Link href="/" aria-label="ZIZU.archive home"><Wordmark /></Link>
      <nav aria-label="Main">
        <NavLink href="/work">Selected work</NavLink><NavLink href="/about">About</NavLink>
        <NavLink href="/services">Services</NavLink><NavLink href="/contact">Contact</NavLink>
        <a href={site.instagram} {...ext}>Instagram</a><a href={site.tiktok} {...ext}>TikTok</a><Link className="enq" href="/contact">Enquire ↗</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <Link className="fcta" href="/contact">Start a project ↗</Link>
      <div><Wordmark /><p>A visual archive by {site.name}. Services by {site.business}.</p></div>
      <nav aria-label="Footer">
        <NavLink href="/work">Selected work</NavLink><NavLink href="/about">About</NavLink>
        <NavLink href="/services">Services</NavLink><NavLink href="/contact">Contact</NavLink>
      </nav>
      <div>
        <a href={`mailto:${site.email}`}>{site.email}</a><br />
        <a href={site.instagram} {...ext}>Instagram ↗</a> · <a href={site.tiktok} {...ext}>TikTok ↗</a>
        <p>© {new Date().getFullYear()} {site.name} / {site.business}</p>
      </div>
    </footer>
  );
}
