import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Img from "@/components/Img";
import Countdown from "@/components/Countdown";
import RegisterForm from "@/components/RegisterForm";
import ShareButtons from "@/components/ShareButtons";
import EventCard from "@/components/EventCard";
import { rawEvents, eventDetails, societies } from "@/lib/data";
import { getEvent, getEvents, googleCalendarUrl } from "@/lib/events";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rawEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title} | IEEE Student Branch`,
    description: event.desc,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { title: event.title, description: event.desc, images: [event.image] },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  const details = eventDetails[slug];
  if (!event || !details) notFound();

  const society = societies.find((s) => s.code === event.society);
  const related = getEvents()
    .filter((e) => e.slug !== event.slug && (e.society === event.society || e.tag === event.tag))
    .slice(0, 3);
  const upcoming = event.status === "upcoming";
  const url = `${siteUrl}/events/${event.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.desc,
    startDate: event.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: details.venue },
    image: event.image,
    organizer: { "@type": "Organization", name: "IEEE Student Branch, Saintgits College of Engineering", url: siteUrl },
    url,
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero kicker={`${event.tag} · ${event.dateLabel}`} title={event.title} desc={event.desc} image={event.image} />

      <section className="about">
        <div className="container event-detail">
          <div className="event-detail-main" data-reveal="stagger">
            <div className="about-image shimmer">
              <Img src={event.image} alt={event.title} width={1200} height={390} sizes="(max-width: 1000px) 100vw, 50vw" priority />
            </div>

            <div className="about-copy">
              <div className="eyebrow">{upcoming ? "Upcoming event" : "Past event"}</div>
              <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
                About this event
              </h2>
              {details.about.map((para) => (
                <p key={para}>{para}</p>
              ))}

              <dl className="event-facts">
                <div>
                  <dt>Date</dt>
                  <dd>{event.dateLong}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{event.tag}</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{details.venue}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{details.time}</dd>
                </div>
                {society && (
                  <div>
                    <dt>Organised by</dt>
                    <dd>
                      <Link href={`/societies/${society.slug}`}>{society.name}</Link>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="event-actions">
                {upcoming && (
                  <>
                    <a className="btn btn-dark" href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
                      Add to Google Calendar
                    </a>
                    <a className="btn btn-ghost" href={`/events/${event.slug}/calendar.ics`} download>
                      Download .ics
                    </a>
                  </>
                )}
                <Link href="/events" className="btn btn-ghost">
                  ← All events
                </Link>
              </div>

              <ShareButtons url={url} title={event.title} />
            </div>
          </div>

          {upcoming && (
            <aside className="event-side" data-reveal="up" aria-label="Registration">
              <div className="event-side-count">
                <span className="next-up-kicker">Starts in</span>
                <Countdown target={event.startsAtIso} />
              </div>
              <RegisterForm slug={event.slug} title={event.title} />
            </aside>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="events related-events">
          <div className="container">
            <div data-reveal="stagger">
              <div className="eyebrow">Keep exploring</div>
              <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
                Related events
              </h2>
            </div>
            <div className="events-grid" data-reveal="stagger" style={{ marginTop: 28 }}>
              {related.map((e) => (
                <EventCard event={e} key={e.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
