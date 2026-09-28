"use client";

import { useEffect } from "react";

const SPOT = ".spot";
const MAGNET = ".btn-primary, .nav-join";

export default function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    let magnetEl: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const spot = target.closest<HTMLElement>(SPOT);
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      if (reduce) return;
      const mag = target.closest<HTMLElement>(MAGNET);
      if (mag && !(mag as HTMLButtonElement).disabled) {
        magnetEl = mag;
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.16;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
        mag.style.transform = `translate(${dx.toFixed(1)}px, ${(dy - 2).toFixed(1)}px)`;
      } else if (magnetEl) {
        magnetEl.style.transform = "";
        magnetEl = null;
      }
    };

    const onLeave = () => {
      if (magnetEl) {
        magnetEl.style.transform = "";
        magnetEl = null;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
