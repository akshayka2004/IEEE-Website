"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let topState = false;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

      const shouldShow = y > 700;
      if (shouldShow !== topState) {
        topState = shouldShow;
        setShowTop(shouldShow);
      }

      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        const off = y > hero.offsetHeight;
        const flag = String(off);
        if (hero.dataset.offscreen !== flag) hero.dataset.offscreen = flag;
        const bg = hero.querySelector<HTMLElement>(".hero-bg");
        if (bg && !reduce) bg.style.transform = off ? "" : `translate3d(0, ${y * 0.16}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={bar} className="scroll-progress-bar" />
      </div>
      <button
        className={`back-to-top${showTop ? " is-shown" : ""}`}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
