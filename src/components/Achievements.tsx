"use client";

import { useMemo, useState } from "react";
import type { Achievement } from "@/lib/content";

export default function Achievements({ items }: { items: Achievement[] }) {
  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [cat, setCat] = useState("All");

  if (items.length === 0) return null;

  const shown = items.filter((i) => cat === "All" || i.category === cat);

  return (
    <section className="achievements" aria-labelledby="achievements-title">
      <div className="container">
        <div className="achievements-head" data-reveal="stagger">
          <div>
            <div className="eyebrow">Recognition</div>
            <h2 className="section-title" id="achievements-title">
              Proud moments.
            </h2>
          </div>
          <div className="chip-row chip-row-light" role="group" aria-label="Filter achievements">
            {cats.map((c) => (
              <button key={c} className={`chip${cat === c ? " is-active" : ""}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="achievement-grid" key={cat}>
          {shown.map((a, i) => (
            <article className="achievement spot card-in" style={{ animationDelay: `${i * 60}ms` }} key={a.title}>
              <span className="achievement-cat">{a.category}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
