"use client";

import { useState } from "react";
import Link from "next/link";
import { societies } from "@/lib/data";
import type { EventItem } from "@/lib/events";

export default function SocietySelector({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState(0);
  const s = societies[active];
  const next = events.find((e) => e.society === s.code && e.status === "upcoming");

  return (
    <section className="societies" id="societies" aria-labelledby="societies-title">
      <div className="container">
        <div className="societies-head" data-reveal="stagger">
          <div>
            <div className="eyebrow">Societies ·</div>
            <h2 className="section-title" id="societies-title">
              Explore our communities.
            </h2>
            <p className="section-copy">Special interest groups. Shared passion. Greater impact.</p>
          </div>
          <Link href="/societies" className="btn btn-dark">
            View All →
          </Link>
        </div>

        <div className="society-select" data-reveal="up">
          <div className="society-select-tabs" role="tablist" aria-label="Choose a society">
            {societies.map((soc, i) => (
              <button
                key={soc.code}
                role="tab"
                aria-selected={i === active}
                aria-controls={`soc-panel-${soc.code}`}
                className={i === active ? "is-active" : ""}
                onClick={() => setActive(i)}
              >
                {soc.code}
              </button>
            ))}
          </div>

          <div className="society-select-panel" id={`soc-panel-${s.code}`} key={s.code} role="tabpanel">
            <div className="society-select-info">
              <span className="eyebrow">{s.code}</span>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="tag-pill-row">
                {s.focus.map((f) => (
                  <span className="tag-pill" key={f}>
                    {f}
                  </span>
                ))}
              </div>
              <div className="society-select-cta">
                <Link href={`/societies/${s.slug}`} className="btn btn-primary">
                  View {s.code} →
                </Link>
              </div>
            </div>

            <div className="society-select-event">
              {next ? (
                <>
                  <span className="next-up-kicker">Next up</span>
                  <Link href={`/events/${next.slug}`} className="society-select-event-title">
                    {next.title}
                  </Link>
                  <span className="next-up-date">
                    {next.dateLabel} · {next.tag}
                  </span>
                </>
              ) : (
                <>
                  <span className="next-up-kicker">This society</span>
                  <p className="society-select-empty">No upcoming events scheduled yet — check back soon.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
