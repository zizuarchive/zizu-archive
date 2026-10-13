"use client";
import Link from "next/link";
import { useState } from "react";
import { categories, type Project } from "@/content/projects";
import { Frame } from "./Media";

// Column width from the image shape, so wide, square, portrait and vertical frames each get a deliberate size.
const span = (r: string) => { const [x, y] = r.split("/").map(Number); const q = x / y; return q >= 2 ? 8 : q >= 1.4 ? 7 : q >= 0.95 ? 5 : q >= 0.7 ? 4 : 3; };
const galleryProjectSlugs = new Set(["versus-behind-the-noise", "fitness-in-motion"]);

type GridCard = {
  project: Project;
  key: string;
  photo?: { src: string; caption: string; ratio: string; index: number };
};

export default function WorkGrid({ items, filters = true }: { items: Project[]; filters?: boolean }) {
  const [cat, setCat] = useState<string>("All Work");
  const shown = cat === "All Work" ? items : items.filter((p) => p.category === cat);
  const videoFirst = [...shown].sort((a, b) => {
    const aIsVideo = Boolean(a.video?.src || a.video?.embed) || a.category === "Video Editing";
    const bIsVideo = Boolean(b.video?.src || b.video?.embed) || b.category === "Video Editing";
    return Number(bIsVideo) - Number(aIsVideo);
  });
  const cards: GridCard[] = videoFirst.flatMap((project): GridCard[] => {
    if (!galleryProjectSlugs.has(project.slug)) return [{ project, key: project.slug }];
    const photos: Omit<NonNullable<GridCard["photo"]>, "index">[] = [];
    if (project.cover) photos.push({ src: project.cover, caption: project.alt ?? project.title, ratio: project.ratio });
    project.gallery?.forEach((shot) => {
      if (shot.src) photos.push({ src: shot.src, caption: shot.caption ?? project.title, ratio: shot.ratio ?? project.ratio });
    });
    return photos.map((photo, index) => ({
      project,
      key: `${project.slug}-photo-${index + 1}`,
      photo: { ...photo, index: index + 1 },
    }));
  });
  return (
    <>
      {filters && (
        <div className="filters" role="group" aria-label="Filter work">
          {["All Work", ...categories].map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className="grid" data-filter={cat}>
        {cards.map(({ project: p, key, photo }) => {
          const href = `/work/${p.slug}`;
          const style = { "--sp": span(photo?.ratio ?? p.ratio) } as React.CSSProperties;
          const frameProject = photo ? { ...p, cover: photo.src, alt: photo.caption, ratio: photo.ratio, video: undefined, broken: undefined } : p;
          const caption = photo ? <>
            <span className="fr">fr.{String(p.n ?? 0).padStart(2, "0")} · {String(photo.index).padStart(2, "0")}</span>
            <b>{photo.caption}</b>
            <span>{p.title} · {p.category} · {p.year}</span>
          </> : <>
            <span className="fr">fr.{String(p.n ?? 0).padStart(2, "0")}</span>
            <b>{p.title}</b>
            <span>{p.category} · {p.year}{p.placeholder && <em className="pfl"> · placeholder</em>}</span>
          </>;
          if (p.detailPage === false) return (
            <div key={key} className="tile" style={style}>
              <div className="wrapf"><Frame p={frameProject} mode="mask" /><span className="tag">{p.category}</span></div>
              <div className="cap">{caption}</div>
            </div>
          );
          return p.video?.src ? (
            <div key={key} className="tile vlog-tile" data-play={p.video ? "" : undefined} style={style}>
              <div className="wrapf">
                <Frame p={frameProject} mode="mask" />
                <Link href={href} className="vlog-card-link">PLAY FILM ↗</Link>
                <span className="tag">{p.category}{p.video && " ▶"}</span>
              </div>
              <Link href={href} className="cap">{caption}</Link>
            </div>
          ) : (
            <Link key={key} href={href} className="tile" data-play={p.video ? "" : undefined} style={style}>
              <div className="wrapf"><Frame p={frameProject} mode="mask" /><span className="tag">{p.category}{p.video && " ▶"}</span></div>
              <div className="cap">{caption}</div>
            </Link>
          );
        })}
        {shown.length === 0 && <p>Nothing in this category yet.</p>}
      </div>
    </>
  );
}
