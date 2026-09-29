import Link from "next/link";
import Img from "./Img";
import EventStatus from "./EventStatus";
import type { EventItem } from "@/lib/events";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="event-card spot tilt">
      <div className="event-photo shimmer">
        <Img
          src={event.image}
          alt={event.title}
          width={900}
          height={215}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
        <EventStatus phase={event.phase} className="event-status-badge" />
      </div>
      <div className="event-info">
        <div className="event-meta">
          <span>
            {event.dateLabel}
            {event.status === "past" ? ` ${event.year}` : ""}
          </span>
          <span className="event-tag">{event.tag}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.desc}</p>
        <Link href={`/events/${event.slug}`} className="event-link">
          {event.status === "upcoming" ? "View Details & Register →" : "View Details →"}
        </Link>
      </div>
    </article>
  );
}
