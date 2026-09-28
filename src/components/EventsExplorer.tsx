"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import EventCard from "./EventCard";
import EventsCalendar from "./EventsCalendar";
import type { EventItem } from "@/lib/events";

type Tab = "upcoming" | "past";

export default function EventsExplorer({ events }: { events: EventItem[] }) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [tab, setTab] = useState<Tab>("upcoming");
  const [tag, setTag] = useState("All");
  const [query, setQuery] = useState("");
  const touchX = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx > 50) setTab("upcoming");
    else if (dx < -50) setTab("past");
  }

  const tags = useMemo(() => ["All", ...Array.from(new Set(events.map((e) => e.tag)))], [events]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (e.status !== tab) return false;
      if (tag !== "All" && e.tag !== tag) return false;
      if (q && !`${e.title} ${e.desc} ${e.tag} ${e.society ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [events, tab, tag, query]);

  const counts = useMemo(
    () => ({
      upcoming: events.filter((e) => e.status === "upcoming").length,
      past: events.filter((e) => e.status === "past").length,
    }),
    [events]
  );

  return (
    <section className="events" id="events" aria-labelledby="events-title">
      <div className="container">
        <h2 className="sr-only" id="events-title">
          Events
        </h2>

        <div className="explorer-bar" data-reveal="up">
          <div className="event-tabs" role="group" aria-label="View" data-active={view === "list" ? "upcoming" : "past"}>
            <button aria-pressed={view === "list"} className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              List
            </button>
            <button aria-pressed={view === "calendar"} className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")}>
              Calendar
            </button>
          </div>

          {view === "list" && (
            <>
              <div className="event-tabs" role="group" aria-label="Filter by time" data-active={tab}>
                <button aria-pressed={tab === "upcoming"} className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>
                  Upcoming ({counts.upcoming})
                </button>
                <button aria-pressed={tab === "past"} className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>
                  Past ({counts.past})
                </button>
              </div>

              <label className="explorer-search">
                <span className="sr-only">Search events</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input type="search" placeholder="Search events" value={query} onChange={(e) => setQuery(e.target.value)} />
              </label>
            </>
          )}
        </div>

        {view === "list" ? (
          <>
            <div className="chip-row" role="group" aria-label="Filter by type">
              {tags.map((t) => (
                <button key={t} className={`chip${tag === t ? " is-active" : ""}`} aria-pressed={tag === t} onClick={() => setTag(t)}>
                  {t}
                </button>
              ))}
            </div>

            <p className="explorer-count" aria-live="polite">
              {results.length} {results.length === 1 ? "event" : "events"}
            </p>

            {results.length === 0 ? (
              <div className="empty-state">
                <p>No events match your filters.</p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setTag("All");
                    setQuery("");
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="events-grid" key={`${tab}-${tag}-${query}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {results.map((event, i) => (
                  <div className="card-in" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }} key={event.slug}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <EventsCalendar events={events} />
        )}

        <p className="explorer-note">
          Want to run a session? <Link href="/contact">Send us your idea →</Link>
        </p>
      </div>
    </section>
  );
}
