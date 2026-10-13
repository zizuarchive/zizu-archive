import Image from "next/image";
import type { Project, Shot } from "@/content/projects";
import ManagedVideo from "./ManagedVideo";
import SoundVideo from "./SoundVideo";

// Real image if a file is set, otherwise a hatched, clearly labelled placeholder.
export function Frame({ p, priority, mode, hero }: { p: Project; priority?: boolean; mode?: "mask" | "parallax"; hero?: boolean }) {
  const real = !!p.cover;
  const videoSrc = p.video?.src ?? (/\.(mp4|mov|webm)$/i.test(p.cover ?? "") ? p.cover : undefined);
  const [rx, ry] = p.ratio.split("/").map(Number);
  return (
    <div className={`frame${real ? "" : " isph"}`} data-mask={mode === "mask" ? "" : undefined} data-parallax={mode === "parallax" ? "" : undefined}
      style={{ aspectRatio: p.ratio, background: real ? p.color : undefined, ...(hero ? { width: `min(100%, calc(var(--hh) * ${rx / ry}))`, marginLeft: "auto" } : {}) }}>
      {real
        ? videoSrc
          ? p.video?.src
            ? <SoundVideo src={videoSrc} poster={p.cover} alt={p.alt ?? p.title} focus={p.focus} />
            : <ManagedVideo src={videoSrc} autoPlay muted loop playsInline aria-label={p.alt ?? p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: p.focus }} />
          : <Image src={p.cover!} alt={p.alt ?? p.title} fill sizes="(max-width:800px) 100vw, 60vw" priority={priority} style={{ objectPosition: p.focus }} />
        : <span className="ph">{p.broken ? <>Image not found<br />{p.broken}</> : <>Placeholder<br />add your photo<br />{p.ratio.replace("/", ":")}</>}</span>}
    </div>
  );
}

export function ShotFrame({ s, alt }: { s: Shot; alt: string }) {
  return (
    <div className={`frame${s.src ? "" : " isph"}`} style={{ aspectRatio: s.ratio ?? "3/2" }}>
      {s.src ? <Image src={s.src} alt={s.caption ?? alt} fill sizes="(max-width:800px) 100vw, 50vw" /> : <span className="ph">{s.broken ? <>Image not found<br />{s.broken}</> : <>Placeholder<br />add your photo</>}</span>}
    </div>
  );
}
