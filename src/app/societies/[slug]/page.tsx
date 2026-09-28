import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { societies } from "@/lib/data";
import { getEvents } from "@/lib/events";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return societies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const society = societies.find((s) => s.slug === slug);
  if (!society) return {};
  return {
    title: `${society.name} | IEEE Student Branch`,
    description: society.desc,
    alternates: { canonical: `/societies/${society.slug}` },
  };
}

export default async function SocietyPage({ params }: Props) {
  const { slug } = await params;
  const society = societies.find((s) => s.slug === slug);
  if (!society) notFound();

  const events = getEvents().filter((e) => e.society === society.code);
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");
  const others = societies.filter((s) => s.slug !== society.slug);

  return (
    <main id="main">
      <PageHero kicker={`Society · ${society.code}`} title={society.name} desc={society.desc} image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2200&q=85" />

      <section className="about">
        <div className="container society-detail">
          <div className="about-copy" data-reveal="stagger">
            <div className="eyebrow">About the society</div>
            <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
              What we do
            </h2>
            {society.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/join" className="btn btn-primary">
                Join this society →
              </Link>
              <Link href="/societies" className="btn btn-ghost">
                ← All societies
              </Link>
            </div>
          </div>

          <div className="focus-panel" data-reveal="up">
            <h3>Focus areas</h3>
            <ul className="focus-list">
              {society.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {events.length > 0 && (
        <section className="events related-events">
          <div className="container">
            <div data-reveal="stagger">
              <div className="eyebrow">Events</div>
              <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
                {upcoming.length > 0 ? "Coming up & recent" : "Recent events"}
              </h2>
            </div>
            <div className="events-grid" data-reveal="stagger" style={{ marginTop: 28 }}>
              {[...upcoming, ...past].map((e) => (
                <EventCard event={e} key={e.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="societies">
        <div className="container">
          <div data-reveal="stagger" style={{ marginBottom: 24 }}>
            <div className="eyebrow">More communities</div>
            <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
              Explore other societies
            </h2>
          </div>
          <div className="chip-row chip-row-light" data-reveal="up">
            {others.map((s) => (
              <Link key={s.slug} href={`/societies/${s.slug}`} className="chip">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
