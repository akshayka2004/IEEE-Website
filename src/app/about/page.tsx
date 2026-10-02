import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PurposeTabs from "@/components/PurposeTabs";
import Timeline from "@/components/Timeline";
import Achievements from "@/components/Achievements";
import SectionDots from "@/components/SectionDots";
import Img from "@/components/Img";
import JoinLink from "@/components/JoinLink";
import { isLive } from "@/lib/pages";
import { missions } from "@/lib/data";
import { getAchievements, getTimeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | IEEE Student Branch",
  description: "About the IEEE Student Branch at Saintgits College of Engineering.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const timeline = getTimeline();
  const achievements = getAchievements();

  return (
    <main id="main">
      <PageHero
        kicker="About IEEE SB"
        title="More than a student branch."
        desc="A community of curious minds, innovators and change-makers building technology for a sustainable and inclusive world."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85"
      />

      <SectionDots
        sections={[
          { id: "about-intro", label: "Who we are" },
          { id: "purpose", label: "Purpose" },
          ...(timeline.length > 0 ? [{ id: "timeline", label: "Journey" }] : []),
          ...(achievements.length > 0 ? [{ id: "achievements", label: "Recognition" }] : []),
          { id: "get-involved", label: "Get involved" },
        ]}
      />

      <section className="about" id="about-intro">
        <div className="container about-grid">
          <div className="about-copy" data-reveal="stagger">
            <div className="eyebrow">Who We Are</div>
            <h2 className="section-title">Learning beyond the classroom.</h2>
            <p>
              IEEE Student Branch at Saintgits College of Engineering brings together curious minds
              who want to explore technology beyond the classroom. Through technical sessions,
              workshops, competitions and professional interactions, we create opportunities to
              learn, build and connect.
            </p>
            <p>
              Founded to bridge the gap between academic learning and industry practice, our branch
              has grown into a thriving hub of societies, each driving projects and events in
              its own domain — from computing and robotics to power systems and signal processing.
            </p>
          </div>

          <div className="about-image shimmer" data-reveal="up">
            <Img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"
              alt="Students collaborating on a project"
              width={1200}
              height={390}
              sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
          </div>

          <div className="about-cards" data-reveal="stagger">
            {missions.slice(0, 2).map((m) => (
              <article className="mission-card spot" key={m.number}>
                <div className="mission-number">{m.number}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PurposeTabs />
      <Timeline items={timeline} />
      <Achievements items={achievements} />

      <section className="cta-band" id="get-involved">
        <div className="container cta-inner" data-reveal="stagger">
          <div>
            <div className="eyebrow">Get involved</div>
            <h2 className="section-title">Ready to build with us?</h2>
          </div>
          <div className="cta-actions">
            <JoinLink className="btn btn-primary">Join IEEE →</JoinLink>
            {isLive("/events") ? (
              <Link href="/events" className="btn btn-dark">
                See upcoming events
              </Link>
            ) : (
              <Link href="/execom" className="btn btn-dark">
                Meet the team
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
