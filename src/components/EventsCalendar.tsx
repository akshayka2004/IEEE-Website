"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/events";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function EventsCalendar({ events }: { events: EventItem[] }) {
  const initial = events.find((e) => e.status === "upcoming") ?? events[0];
  const [cursor, setCursor] = useState({ year: initial?.year ?? 2026, month: initial?.month ?? 0 });

  const { year, month } = cursor;

  const cells = useMemo(() => {
    const first = new Date(Date.UTC(year, month, 1));
    const offset = (first.getUTCDay() + 6) % 7;
    const total = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const out: { day: number | null; events: EventItem[] }[] = [];
    for (let i = 0; i < offset; i++) out.push({ day: null, events: [] });
    for (let d = 1; d <= total; d++) {
      out.push({ day: d, events: events.filter((e) => e.year === year && e.month === month && e.day === d) });
    }
    while (out.length % 7 !== 0) out.push({ day: null, events: [] });
    return out;
  }, [events, year, month]);

  const monthEvents = events
    .filter((e) => e.year === year && e.month === month)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  function shift(delta: number) {
    const d = new Date(Date.UTC(year, month + delta, 1));
    setCursor({ year: d.getUTCFullYear(), month: d.getUTCMonth() });
  }

  return (
    <div className="calendar">
      <div className="calendar-head">
        <button className="icon-btn icon-btn-light" onClick={() => shift(-1)} aria-label="Previous month">
          ‹
        </button>
        <h3 aria-live="polite">
          {MONTHS[month]} {year}
        </h3>
        <button className="icon-btn icon-btn-light" onClick={() => shift(1)} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {DAYS.map((d) => (
          <div className="calendar-dow" key={d}>
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div className={`calendar-cell${c.day === null ? " is-empty" : ""}${c.events.length ? " has-events" : ""}`} key={i}>
            {c.day !== null && <span className="calendar-day">{c.day}</span>}
            {c.events.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className={`calendar-chip${e.status === "past" ? " is-past" : ""}`} title={e.title}>
                <span>{e.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="calendar-list">
        {monthEvents.length === 0 ? (
          <p className="calendar-empty">No events in {MONTHS[month]} {year}.</p>
        ) : (
          monthEvents.map((e) => (
            <Link key={e.slug} href={`/events/${e.slug}`} className="calendar-row">
              <span className="calendar-row-date">
                {e.dateLabel}
              </span>
              <span className="calendar-row-title">{e.title}</span>
              <span className="calendar-row-tag">{e.tag}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
