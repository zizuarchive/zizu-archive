import Image from "next/image";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { resolveAll } from "@/content/media";

const kinds = { still: "", alt: "Alternate frame", bts: "Behind the scenes" } as const;
const pad = (n: number) => String(n).padStart(2, "0");

// THE SIGNATURE SEQUENCE. Built from one project (site.sequence in content/site.ts):
// its cover, then its gallery. Scroll: the cover expands from a small frame, then each related frame wipes in.
export default function Sequence() {
  const p = resolveAll(projects).find((x) => x.slug === site.sequence);
  if (!p) return null;
  const shots = [{ src: p.cover, broken: p.broken, caption: p.title, kind: "still" as const }, ...(p.gallery ?? [])];
  return (
    <div className="seq-wrap">
      <section className="seq" data-seq aria-label={`${p.title}, frame by frame`}>
        <div className="seq-stage">
          <span className="seq-count" aria-hidden="true">fr.01 / {pad(shots.length)}</span>
          {shots.map((s, i) => (
            <figure className="sq" key={i}>
              <div className={`sq-img${s.src ? "" : " isph"}`}>
                {s.src ? <Image src={s.src} alt={s.caption ?? p.title} fill sizes="100vw" style={{ objectPosition: p.focus }} />
                  : <span className="ph">{s.broken ? <>Image not found<br />{s.broken}</> : <>Placeholder<br />add your photo</>}</span>}
              </div>
              <figcaption><i className="fnum">fr.{pad(i + 1)}</i>{kinds[s.kind ?? "still"] && <em className="kl">{kinds[s.kind ?? "still"]}</em>}{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
