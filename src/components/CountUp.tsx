"use client";

import { useEffect, useRef } from "react";

export default function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const duration = 1000;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            el!.textContent = `${Math.floor(progress * target)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
            else el!.textContent = `${target}${suffix}`;
          }

          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div className="stat-number" ref={ref}>
      {target}
      {suffix}
    </div>
  );
}
