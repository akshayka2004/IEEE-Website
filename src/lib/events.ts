import { eventDetails, rawEvents, stats, type GalleryCategory, type RawEvent } from "./data";
import { siteUrl } from "./site";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** open: >7 days out · soon: within 7 days · live: today · completed: already happened */
export type EventPhase = "open" | "soon" | "live" | "completed";

export type EventItem = RawEvent & {
  status: "upcoming" | "past";
  phase: EventPhase;
  /** e.g. "24 OCT" */
  dateLabel: string;
  /** e.g. "24 October 2026" */
  dateLong: string;
  /** ISO timestamp with IST offset, used for countdowns */
  startsAtIso: string;
  month: number;
  year: number;
  day: number;
};

export function todayIST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

function phaseOf(startsAt: string, today: string): EventPhase {
  if (startsAt < today) return "completed";
  if (startsAt === today) return "live";
  const daysUntil = Math.round((Date.parse(startsAt) - Date.parse(today)) / 86400000);
  return daysUntil <= 7 ? "soon" : "open";
}

function decorate(e: RawEvent, today: string): EventItem {
  const [y, m, d] = e.startsAt.split("-").map(Number);
  return {
    ...e,
    status: e.startsAt >= today ? "upcoming" : "past",
    phase: phaseOf(e.startsAt, today),
    dateLabel: `${String(d).padStart(2, "0")} ${MONTHS[m - 1]}`,
    dateLong: `${d} ${MONTHS_LONG[m - 1]} ${y}`,
    startsAtIso: `${e.startsAt}T00:00:00+05:30`,
    month: m - 1,
    year: y,
    day: d,
  };
}

const TAG_TO_GALLERY_CATEGORY: Record<string, GalleryCategory> = {
  Hackathon: "Competitions",
  Workshop: "Workshops",
  Bootcamp: "Workshops",
  "Technical Talk": "Events",
  Panel: "Events",
  Seminar: "Events",
  "Site Visit": "Events",
  Symposium: "Events",
};

/** Best-effort mapping from an event's tag to the closest gallery filter, used to link "View photos" to a pre-filtered gallery. */
export function galleryCategoryFor(tag: string): GalleryCategory {
  return TAG_TO_GALLERY_CATEGORY[tag] ?? "Events";
}

/** Upcoming events (soonest first) followed by past events (most recent first). */
export function getEvents(): EventItem[] {
  const today = todayIST();
  const all = rawEvents.map((e) => decorate(e, today));
  const upcoming = all.filter((e) => e.status === "upcoming").sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const past = all.filter((e) => e.status === "past").sort((a, b) => b.startsAt.localeCompare(a.startsAt));
  return [...upcoming, ...past];
}

export function getEvent(slug: string): EventItem | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getNextEvent(): EventItem | undefined {
  return getEvents().find((e) => e.status === "upcoming");
}

export function getStats() {
  return stats;
}

const pad = (n: number) => String(n).padStart(2, "0");

function nextDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + 1));
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}`;
}

export function googleCalendarUrl(e: EventItem): string {
  const details = eventDetails[e.slug];
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.startsAt.replaceAll("-", "")}/${nextDay(e.startsAt)}`,
    details: `${e.desc}\n\n${siteUrl}/events/${e.slug}`,
    location: details?.venue ?? "Saintgits College of Engineering",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const icsEscape = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export function eventToIcs(e: EventItem): string {
  const details = eventDetails[e.slug];
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IEEE Student Branch Saintgits//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@ieee-sb-saintgits`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${e.startsAt.replaceAll("-", "")}`,
    `DTEND;VALUE=DATE:${nextDay(e.startsAt)}`,
    `SUMMARY:${icsEscape(e.title)}`,
    `DESCRIPTION:${icsEscape(e.desc)}`,
    `LOCATION:${icsEscape(details?.venue ?? "Saintgits College of Engineering")}`,
    `URL:${siteUrl}/events/${e.slug}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
