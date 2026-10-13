"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// CUSTOM CURSOR. Only runs with a mouse (fine pointer) and when motion is allowed.
// Everywhere else the normal cursor stays. The class "has-cursor" (which hides the normal cursor)
// is added only once this code is running, so if JavaScript fails you keep the normal cursor.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const label = el.querySelector<HTMLElement>(".cur-label")!;
    let off: (() => void) | undefined;

    const start = () => {
      document.documentElement.classList.add("has-cursor");
      const x = gsap.quickTo(el, "x", { duration: 0.22, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.22, ease: "power3.out" });
      let video: HTMLVideoElement | null = null;
      const setState = (s: string, text = "") => {
        if (el.dataset.s === s && label.textContent === text) return;
        el.dataset.s = s; label.textContent = text;
      };

      const move = (e: MouseEvent) => {
        if (el.dataset.on !== "1") { gsap.set(el, { x: e.clientX, y: e.clientY }); el.dataset.on = "1"; }
        x(e.clientX); y(e.clientY);
        const t = e.target as Element | null;
        if (video) { video.style.cursor = ""; video = null; }
        const v = t?.closest("video") as HTMLVideoElement | null;
        if (v) {
          // Show "PLAY FILM" only while paused and away from the native control bar.
          if (v.paused && e.clientY < v.getBoundingClientRect().bottom - 64) { v.style.cursor = "none"; video = v; return setState("play", "PLAY FILM ↗"); }
          return setState("native");
        }
        if (t?.closest("input,textarea,select")) return setState("native");
        if (t?.closest("[data-play]")) return setState("play", "PLAY FILM ↗");
        if (t?.closest("a.tile,.rt,.c")) return setState("view", "VIEW PROJECT ↗");
        if (t?.closest("a,button,label,summary")) return setState("link");
        setState("idle");
      };
      const down = () => el.classList.add("down");
      const up = () => el.classList.remove("down");
      const leave = (e: MouseEvent) => { if (!e.relatedTarget) el.dataset.on = ""; };

      window.addEventListener("mousemove", move, { passive: true });
      window.addEventListener("mousedown", down);
      window.addEventListener("mouseup", up);
      document.addEventListener("mouseout", leave);
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mousedown", down);
        window.removeEventListener("mouseup", up);
        document.removeEventListener("mouseout", leave);
        document.documentElement.classList.remove("has-cursor");
        el.dataset.on = "";
      };
    };

    const sync = () => { off?.(); off = mq.matches ? start() : undefined; };
    sync();
    mq.addEventListener("change", sync);
    return () => { mq.removeEventListener("change", sync); off?.(); };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" data-s="idle"><span className="ring" /><span className="cur-label" /></div>;
}
