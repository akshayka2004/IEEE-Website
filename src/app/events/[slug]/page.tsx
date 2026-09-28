import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { events, eventDetails } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.title} | IEEE Student Branch`,
    description: event.desc,
    alternates: { canonical: `/events/${event.slug}` },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  const details = eventDetails[slug];
  if (!event || !details) notFound();

  return (
    <main id="main">
      <PageHero kicker={`${event.tag} · ${event.date}`} title={event.title} desc={event.desc} image={event.image} />

      <section className="about">
        <div className="container event-detail">
          <div className="about-image">
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={390}
              sizes="(max-width: 1000px) 100vw, 50vw"
            />
          </div>

          <div className="about-copy">
            <div className="eyebrow">{event.status === "upcoming" ? "Upcoming event" : "Past event"}</div>
            <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
              About this event
            </h2>
            {details.about.map((para) => (
              <p key={para}>{para}</p>
            ))}

            <dl className="event-facts">
              <div>
                <dt>Date</dt>
                <dd>{event.date}</dd>
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
            </dl>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {event.status === "upcoming" && (
                <Link href="/contact" className="btn btn-primary">
                  Enquire to register →
                </Link>
              )}
              <Link href="/events" className="btn btn-dark">
                ← All events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
