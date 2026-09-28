"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { events as allEvents, type EventItem } from "@/lib/data";

export default function EventsSection({
  limit,
  showViewAll = false,
}: {
  limit?: number;
  showViewAll?: boolean;
}) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = useMemo(() => {
    const list: EventItem[] = allEvents.filter((e) =>
      tab === "upcoming" ? e.status === "upcoming" : e.status === "past"
    );
    return limit ? list.slice(0, limit) : list;
  }, [tab, limit]);

  return (
    <section className="events" id="events">
      <div className="container">
        <div className="events-head">
          <div>
            <div className="eyebrow">Events ·</div>
            <h2 className="section-title">What&apos;s happening?</h2>
            <p className="section-copy">Explore our upcoming events, workshops and technical activities.</p>
          </div>

          <div className="event-tabs">
            <button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>
              Upcoming Events
            </button>
            <button className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>
              Recently Conducted
            </button>
          </div>
        </div>

        <div className="events-grid">
          {filtered.map((event) => (
            <article className="event-card" key={event.slug}>
              <div className="event-photo">
                <Image src={event.image} alt={event.title} width={900} height={215} />
              </div>
              <div className="event-info">
                <div className="event-meta">
                  <span>{event.date}</span>
                  <span className="event-tag">{event.tag}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
                <Link href={`/events#${event.slug}`} className="event-link">
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {showViewAll && (
          <div style={{ marginTop: 34, position: "relative", zIndex: 1 }}>
            <Link href="/events" className="btn btn-primary">
              View All Events →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
