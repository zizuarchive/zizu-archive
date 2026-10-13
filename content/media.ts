import fs from "node:fs";
import path from "node:path";
import type { Project, Shot } from "./projects";

// DROP-IN MEDIA (server only). Files in public/media are matched to projects by name:
//   photos/<slug>.jpg                  -> cover          photos/<slug>-before.jpg / -after.jpg -> comparison
//   photos/<slug>-1.jpg, -2.jpg ...    -> gallery        video/<slug>.mp4 (or .webm)           -> film (cover = poster)
// .jpg .jpeg .png .webp all work. A path you type in projects.ts wins over these names.
const imgExts = ["jpg", "jpeg", "png", "webp"];
const has = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
function find(name: string, dir = "photos", list = imgExts): string | undefined {
  for (const e of list) { const s = `/media/${dir}/${name}.${e}`; if (has(s)) return s; }
  return undefined;
}
// A path you typed that points to a missing file is marked "broken", so the site shows a labelled
// fallback frame instead of a broken-image icon.
function pick(explicit: string | undefined, auto: string | undefined) {
  if (explicit) return has(explicit) ? { src: explicit, broken: undefined } : { src: undefined, broken: explicit };
  return { src: auto, broken: undefined };
}

export function resolveAll(list: Project[]): Project[] {
  return list.map((p, i) => {
    const c = pick(p.cover, find(p.slug));
    const vs = p.video?.src;
    const v = vs ? (has(vs) ? vs : undefined) : p.video?.embed ? undefined : find(p.slug, "video", ["mp4", "webm"]);
    const found: Shot[] = [];
    for (let k = 1; k <= 12; k++) { const s = find(`${p.slug}-${k}`); if (!s) break; found.push({ src: s }); }
    const written = p.gallery?.map((g, k) => { const r = pick(g.src, find(`${p.slug}-${k + 1}`)); return { ...g, src: r.src, broken: r.broken }; });
    return {
      ...p, n: i + 1, cover: c.src, broken: c.broken,
      video: v || vs || p.video?.embed ? { ...p.video, src: v, missing: vs && !v ? vs : undefined } : undefined,
      gallery: written ?? (found.length ? found : undefined),
      compare: p.compare && { ...p.compare, before: pick(p.compare.before, find(`${p.slug}-before`)).src, after: pick(p.compare.after, find(`${p.slug}-after`)).src },
    };
  });
}
