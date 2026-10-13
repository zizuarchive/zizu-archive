import Link from "next/link";
import { site } from "@/content/site";
import { projects, type Project } from "@/content/projects";
import { Frame } from "@/components/Media";
import WorkGrid from "@/components/WorkGrid";
import { resolveAll } from "@/content/media";
import Sequence from "@/components/Sequence";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const fr = (p: Project) => String(p.n ?? 0).padStart(2, "0");

export default function Home() {
  const all = resolveAll(projects);
  const featured = site.featured.map((s) => all.find((p) => p.slug === s)).filter((p): p is Project => !!p);
  const [a] = featured;
  // "Currently in the archive": newest REAL projects only. Placeholders never appear here.
  const current = all.filter((p) => !p.placeholder && p.detailPage !== false).slice(-2).reverse();
  return (
    <>
      <div id="intro" className="intro" aria-hidden="true"><span className="wm"><b>ZIZU</b><i>.archive</i></span></div>

      <section className="hero">
        <p className="toplabel"><span>A visual archive</span><span>Film · Photography · Editing</span></p>
        <h1 data-hero><span className="b">{site.headline[0]}</span> <span className="it">{site.headline[1]}</span></h1>
        <div className="stage">
          <div className="copy">
            <p>{site.intro[0]}</p>
            <div className="ctas">
              <Link className="btn" href="/work">EXPLORE MY WORK ↗</Link>
              <Link className="btn alt" href="/contact">LET&apos;S CREATE SOMETHING ↗</Link>
            </div>
          </div>
          <div className="focal">
            {a && <Link href={`/work/${a.slug}`} className="c c1"><Frame p={{ ...a, cover: "/work/0602.mov", ratio: "16/9" }} priority mode="parallax" hero /></Link>}
          </div>
        </div>
      </section>

      <div className="intro2"><p>{site.intro[1]}</p><p>{site.intro[2]}</p></div>

      <p className="biz"><span><b>{site.business}</b> makes videography, editing, photography and digital content for creators, brands and businesses.</span>
        <span><Link className="more" href="/services">Services ↗</Link> <Link className="more" href="/contact">Enquire ↗</Link></span></p>

      <Sequence />

      <section className="s" id="work">
        <h2>Selected work</h2>
        <WorkGrid items={featured} filters={false} />
        <p><Link className="more" href="/work">View the full archive ↗</Link></p>
      </section>

      {current.length > 0 && (
        <section className="s two">
          <h2>Currently in the archive</h2>
          <ul className="svc">{current.map((p) => <li key={p.slug}><b><Link className="more" href={`/work/${p.slug}`}>{p.title} ↗</Link></b><span>fr.{fr(p)} · {p.category} · {p.year}</span></li>)}</ul>
        </section>
      )}

      <section className="s two">
        <h2>About</h2>
        <div><p className="lead" data-scrub>{site.about.join(" ")}</p><Link className="more" href="/about">More about the work ↗</Link></div>
      </section>

      <section className="s two">
        <h2>{site.business}</h2>
        <div>
          <ul className="svc">{site.services.map((s) => <li key={s.title}><b>{s.title}</b><span>{s.text}</span></li>)}</ul>
          <Link className="more" href="/services">Services and enquiries ↗</Link>
        </div>
      </section>

      <section className="s two">
        <h2>Elsewhere</h2>
        <div>
          <p>More work, behind the scenes and experiments live on social. The archive stays here; the daily feed lives there.</p>
          {site.posts.map((p) => <p key={p.url}><a className="more" href={p.url} {...ext}>{p.platform}: {p.title} ↗</a></p>)}
          <p><a className="more" href={site.instagram} {...ext}>Instagram @zizu.archive ↗</a><br /><a className="more" href={site.tiktok} {...ext}>TikTok @zizu.archive ↗</a></p>
        </div>
      </section>

      <section className="s end">
        <h2>Have a project in mind?</h2>
        <Link className="big" href="/contact">Let&apos;s talk ↗</Link>
        <p><a className="more" href={`mailto:${site.email}`}>{site.email}</a></p>
        <div className="closing"><span className="wm" data-split="chars"><b>ZIZU</b><i>.archive</i></span></div>
      </section>
    </>
  );
}
