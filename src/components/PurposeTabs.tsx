"use client";

import { useRef, useState } from "react";
import { missions } from "@/lib/data";

export default function PurposeTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % missions.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + missions.length) % missions.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = missions.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  const current = missions[active];

  return (
    <section className="purpose" id="purpose" aria-labelledby="purpose-title">
      <div className="container">
        <div data-reveal="stagger">
          <div className="eyebrow">What drives us</div>
          <h2 className="section-title" id="purpose-title">
            Purpose, in practice.
          </h2>
        </div>

        <div className="purpose-layout" data-reveal="up">
          <div className="purpose-tabs" role="tablist" aria-label="Our purpose" aria-orientation="vertical">
            {missions.map((m, i) => (
              <button
                key={m.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                id={`tab-${m.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${m.id}`}
                tabIndex={i === active ? 0 : -1}
                className={i === active ? "is-active" : ""}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="purpose-num">{m.number}</span>
                {m.title}
              </button>
            ))}
          </div>

          <div className="purpose-panel" role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} key={current.id}>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
            <ul>
              {current.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
