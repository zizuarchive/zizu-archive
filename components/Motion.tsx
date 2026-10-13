"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// THE MOTION SYSTEM. One easing ("expo.out"), one reveal style (rise from a mask), one stagger rhythm.
// Tweak the numbers in this file to change how the whole site feels.

// Wraps words (or single letters) in spans so they can be animated. Returns the pieces and an undo function.
function split(el: HTMLElement, chars: boolean) {
  const saved = el.innerHTML;
  if (chars) { el.setAttribute("role", "img"); el.setAttribute("aria-label", el.innerText.replace(/\s+/g, " ").trim()); }
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  const pieces: HTMLElement[] = [];
  nodes.forEach((n) => {
    const frag = document.createDocumentFragment();
    (n.textContent ?? "").split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (!part.trim()) { frag.append(" "); return; }
      const w = document.createElement("span");
      w.className = "w";
      (chars ? [...part] : [part]).forEach((t) => {
        const s = document.createElement("span");
        s.className = "wi"; s.textContent = t; w.append(s); pieces.push(s);
      });
      frag.append(w);
    });
    n.replaceWith(frag);
  });
  el.style.visibility = "visible";
  return { pieces, undo: () => { el.innerHTML = saved; el.removeAttribute("aria-label"); el.removeAttribute("role"); el.style.visibility = ""; } };
}

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const q = (s: string) => gsap.utils.toArray<HTMLElement>(s);
    const mm = gsap.matchMedia();

    // Reduced motion: show everything immediately, no intro, no animation.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("js");
      const intro = document.getElementById("intro");
      if (intro) intro.style.display = "none";
    });

    // Full experience.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const undo: (() => void)[] = [];
      const ease = "expo.out";
      const intro = document.getElementById("intro");
      const first = !!intro && !sessionStorage.getItem("zizu-intro"); // intro plays once per visit
      const tl = gsap.timeline({ defaults: { ease } });

      // 1. Opening sequence: wordmark rises letter by letter, curtain lifts, headline follows.
      if (intro && first) {
        const s = split(intro.querySelector<HTMLElement>(".wm")!, true); undo.push(s.undo);
        tl.from(s.pieces, { yPercent: 115, duration: 1, stagger: 0.05 })
          .to(intro, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "+=0.5")
          .set(intro, { display: "none" })
          .call(() => sessionStorage.setItem("zizu-intro", "1"));
      } else if (intro) intro.style.display = "none";

      const hero = q("[data-hero]").map((el) => split(el, false));
      hero.forEach((h) => undo.push(h.undo));
      if (hero.length) {
        tl.from(hero.flatMap((h) => h.pieces), { yPercent: 115, duration: 1.1, stagger: 0.08 }, first ? ">" : 0)
          .fromTo(".hero .c1", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.05 }, "<0.2")
          .from(".copy p, .ctas", { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 }, "<0.2");
      }

      // 2. Headings rise out of a mask as they enter the screen.
      q("main h1.h, main h2").forEach((el) => {
        const s = split(el, false); undo.push(s.undo);
        gsap.from(s.pieces, { yPercent: 115, duration: 1, stagger: 0.07, ease, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      // 3. Letter-by-letter closing wordmark.
      q('[data-split="chars"]').forEach((el) => {
        const s = split(el, true); undo.push(s.undo);
        gsap.from(s.pieces, { yPercent: 115, duration: 1.1, stagger: 0.045, ease, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });

      // 4. About text lights up word by word as you scroll.
      q("[data-scrub]").forEach((el) => {
        const s = split(el, false); undo.push(s.undo);
        gsap.fromTo(s.pieces, { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true } });
      });

      // 5. Images: wipe open from a mask, and drift slightly inside their frame (parallax).
      q("[data-mask], [data-parallax]").forEach((f) => {
        const inner = f.querySelector("img, .ph");
        if (f.hasAttribute("data-mask"))
          gsap.fromTo(f, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease, scrollTrigger: { trigger: f, start: "top 90%", once: true } });
        if (inner && !f.closest("[data-reel]"))
          gsap.fromTo(inner, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.08, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 6. Service rows step in one after another.
      if (q(".svc li, .rows li").length) {
        gsap.set(".svc li, .rows li", { opacity: 0, y: 40 });
        ScrollTrigger.batch(".svc li, .rows li", { start: "top 92%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease, overwrite: true }) });
      }

      // 7. Thin progress line across the top shows how far through the archive you are.
      gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });

      return () => undo.forEach((u) => u());
    });

    // SIGNATURE SEQUENCE: a small photograph expands to fill the screen, then each related frame wipes in.
    // It is pinned while you scroll. With reduced motion (or without JavaScript) the frames simply stack as a list.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const seq = document.querySelector<HTMLElement>("[data-seq]");
      if (!seq) return;
      const slides = gsap.utils.toArray<HTMLElement>(".sq", seq);
      const count = seq.querySelector<HTMLElement>(".seq-count");
      const n = slides.length;
      seq.classList.add("live");
      const first = slides[0].querySelector<HTMLElement>(".sq-img")!;
      const cap0 = slides[0].querySelector<HTMLElement>("figcaption");
      gsap.set(first, { clipPath: "inset(24% 36% 24% 36%)" });
      if (cap0) gsap.set(cap0, { opacity: 0, y: 16 });
      gsap.set(slides.slice(1), { clipPath: "inset(100% 0 0 0)" });
      let last = -1;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: seq, start: "top top", end: () => "+=" + Math.round(window.innerHeight * (n * 0.9 + 0.6)),
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            const k = Math.min(n - 1, Math.floor(self.progress * n));
            if (k !== last && count) { last = k; count.textContent = `fr.${String(k + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`; }
          },
        },
      });
      tl.to(first, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" });
      if (cap0) tl.to(cap0, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
      slides.slice(1).forEach((sl) => tl.to(sl, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, "+=0.35"));
      return () => seq.classList.remove("live");
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [pathname]);

  return <div className="progress" aria-hidden="true" />;
}
