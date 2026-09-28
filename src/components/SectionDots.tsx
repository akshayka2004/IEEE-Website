"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionDots({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [visible, setVisible] = useState(false);
  const ratios = useRef<Record<string, number>>({});

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    if (els.length < 2) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        const top = Object.entries(ratios.current).sort((a, b) => b[1] - a[1])[0];
        if (top && top[1] > 0) setActive(top[0]);
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  if (sections.length < 2) return null;

  return (
    <nav className={`section-dots${visible ? " is-visible" : ""}`} aria-label="Sections on this page">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-active" : ""} aria-current={active === s.id ? "true" : undefined}>
          <span className="section-dots-tip">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
