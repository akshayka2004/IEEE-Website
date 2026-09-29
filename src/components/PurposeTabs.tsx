"use client";

import { useEffect, useRef, useState } from "react";
import { missions } from "@/lib/data";

export default function PurposeTabs() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);
  const suppressObserver = useRef(false);

  useEffect(() => {
    const els = blockRefs.current.filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (suppressObserver.current) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function goTo(i: number) {
    setActive(i);
    suppressObserver.current = true;
    blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      suppressObserver.current = false;
    }, 700);
  }

  return (
    <section className="purpose" id="purpose" aria-labelledby="purpose-title">
      <div className="container">
        <div data-reveal="stagger">
          <div className="eyebrow">What drives us</div>
          <h2 className="section-title" id="purpose-title">
            Purpose, in practice.
          </h2>
        </div>

        <div className="story-layout" data-reveal="up">
          <div className="story-nav" role="tablist" aria-label="Our purpose" aria-orientation="vertical">
            {missions.map((m, i) => (
              <button
                key={m.id}
                id={`story-tab-${m.id}`}
                role="tab"
                aria-selected={i === active}
                aria-controls={`story-${m.id}`}
                tabIndex={i === active ? 0 : -1}
                className={i === active ? "is-active" : ""}
                onClick={() => goTo(i)}
              >
                <span className="purpose-num">{m.number}</span>
                {m.title}
              </button>
            ))}
          </div>

          <div className="story-blocks">
            {missions.map((m, i) => (
              <article
                key={m.id}
                id={`story-${m.id}`}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                role="tabpanel"
                aria-labelledby={`story-tab-${m.id}`}
                className={`story-block${i === active ? " is-active" : ""}`}
              >
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <ul>
                  {m.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
