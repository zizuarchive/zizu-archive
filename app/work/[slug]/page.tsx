import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Frame, ShotFrame } from "@/components/Media";
import ManagedVideo from "@/components/ManagedVideo";
import { resolveAll } from "@/content/media";
import Compare from "@/components/Compare";

const kinds = { still: "Still", alt: "Alternate frame", bts: "Behind the scenes" } as const;
const pad = (i: number) => String(i + 1).padStart(2, "0");
const detailProjects = projects.filter((p) => p.detailPage !== false);

export function generateStaticParams() { return detailProjects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = detailProjects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = resolveAll(detailProjects);
  const i = all.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = all[i], n = all.length;
  const prev = all[(i - 1 + n) % n], next = all[(i + 1) % n];
  return (
    <article className={`s proj${p.dark ? " dark" : ""}`}>
      <Link className="more" href="/work">← Back to the archive</Link>
      <h1 className="h">{p.title}</h1>
      <p className="meta"><i className="fnum">fr.{pad(i)}</i>{p.category} · {p.year}{p.role ? ` · ${p.role}` : ""}{p.placeholder && <em className="pfl"> · placeholder</em>}</p>
      {p.video?.src ? <div className={`vid-stage${p.ratio === "9/16" ? " portrait" : ""}`} style={{ aspectRatio: p.ratio }}><ManagedVideo className="vid" controls playsInline preload="metadata" poster={p.cover} src={p.video.src} muted /></div>
        : p.video?.embed ? <div className={`vid-stage${p.ratio === "9/16" ? " portrait" : ""}`} style={{ aspectRatio: p.ratio }}><iframe className="vid" src={p.video.embed} title={p.title} loading="lazy" allowFullScreen /></div>
        : <><Frame p={p} priority />{p.video?.missing && <p className="small demo">Video file not found: {p.video.missing}. Put it in public/media/video/ (see HOW-TO-ADD-WORK.md).</p>}</>}
      <div className="two">
        <p className="lead">{p.summary}</p>
        <div>
          {p.note && <blockquote className="note">{p.note}</blockquote>}
          {p.intention && <p><b>Creative intention.</b> {p.intention}</p>}
          {p.details && <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>}
        </div>
      </div>
      {p.compare && <Compare {...p.compare} />}
      {p.gallery && (
        <div className="gal">
          {p.gallery.map((g, k) => (
            <figure key={k}><ShotFrame s={g} alt={p.title} />
              <figcaption><i className="kl">{kinds[g.kind ?? "still"]}</i> {g.caption}</figcaption></figure>
          ))}
        </div>
      )}
      <p className="enqrow">Want something like this? <Link className="more" href="/contact">Enquire with ZIZU Studios ↗</Link></p>
      <nav className="pn" aria-label="Projects">
        <Link className="pl" href={`/work/${prev.slug}`}><small>← Previous · fr.{pad(all.indexOf(prev))}</small><b>{prev.title}</b></Link>
        <Link className="pl r" href={`/work/${next.slug}`}><small>Next · fr.{pad(all.indexOf(next))} →</small><b>{next.title}</b></Link>
      </nav>
    </article>
  );
}
