import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/Chrome";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import { site } from "@/content/site";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--serif" });
const description = "A visual archive of filmmaking, video editing and photography. Services by ZIZU Studios.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.name} — ${site.headline.join(" ")}`, template: `%s — ${site.name}` },
  description,
  openGraph: { title: site.name, description, type: "website" },
  twitter: { card: "summary_large_image", title: site.name, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JavaScript as available so animated text can start hidden. Falls back to visible after 5s. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.remove('js')},5000)" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Motion />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
