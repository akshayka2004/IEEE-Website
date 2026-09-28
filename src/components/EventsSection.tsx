"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EventCard from "./EventCard";
import Countdown from "./Countdown";
import type { EventItem } from "@/lib/events";

export default function EventsSection({ events, limit = 3 }: { events: EventItem[]; limit?: number }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = useMemo(() => events.filter((e) => e.status === tab).slice(0, limit), [events, tab, limit]);
  const next = events.find((e) => e.status === "upcoming");

  return (
    <section className="events" id="events" aria-labelledby="events-title">
      <div className="container">
        <div className="events-head" data-reveal="stagger">
          <div>
            <div className="eyebrow">Events ·</div>
            <h2 className="section-title" id="events-title">
              What&apos;s happening?
            </h2>
            <p className="section-copy">Explore our upcoming events, workshops and technical activities.</p>
          </div>

          <div className="event-tabs" role="group" aria-label="Filter events" data-active={tab}>
            <button aria-pressed={tab === "upcoming"} className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>
              Upcoming Events
            </button>
            <button aria-pressed={tab === "past"} className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>
              Recently Conducted
            </button>
          </div>
        </div>

        {next && (
          <div className="next-up" data-reveal="up">
            <div className="next-up-copy">
              <span className="next-up-kicker">Next up</span>
              <Link href={`/events/${next.slug}`} className="next-up-title">
                {next.title}
              </Link>
              <span className="next-up-date">
                {next.dateLong} · {next.tag}
              </span>
            </div>
            <Countdown target={next.startsAtIso} />
            <Link href={`/events/${next.slug}`} className="btn btn-primary">
              Register →
            </Link>
          </div>
        )}

        <div className="events-grid" key={tab}>
          {filtered.map((event, i) => (
            <div className="card-in" style={{ animationDelay: `${i * 70}ms` }} key={event.slug}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 34, position: "relative", zIndex: 1 }}>
          <Link href="/events" className="btn btn-primary">
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
