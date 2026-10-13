"use client";
import Image from "next/image";
import { useState } from "react";

// Before / after slider for editing and colour-grade comparisons. Works with the keyboard too.
export default function Compare({ before, after, caption }: { before?: string; after?: string; caption?: string }) {
  const [v, setV] = useState(50);
  const side = (src: string | undefined, label: string) =>
    src ? <Image src={src} alt={label} fill sizes="(max-width:800px) 100vw, 900px" /> : <span className="ph">Placeholder<br />{label} frame</span>;
  return (
    <figure className="cmp">
      <div className={`cmp-box${before && after ? "" : " isph"}`}>
        <div className="cmp-a">{side(after, "After")}</div>
        <div className="cmp-b" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>{side(before, "Before")}</div>
        <span className="cmp-line" style={{ left: `${v}%` }} aria-hidden="true" />
      </div>
      <label className="cmp-r"><span>Before</span><input type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} aria-label="Slide between before and after" /><span>After</span></label>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
