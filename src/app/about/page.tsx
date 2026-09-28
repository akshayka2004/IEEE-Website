import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { missions } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | IEEE Student Branch",
  description: "About the IEEE Student Branch at Saintgits College of Engineering.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        kicker="About IEEE SB"
        title="More than a student branch."
        desc="A community of curious minds, innovators and change-makers building technology for a sustainable and inclusive world."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="about">
        <div className="container about-grid">
          <div className="about-copy">
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
              has grown into a thriving hub of seven societies, each driving projects and events in
              its own domain — from computing and robotics to power systems and signal processing.
            </p>
          </div>

          <div className="about-image">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"
              alt="Students collaborating on a project"
              width={1200}
              height={390}
            />
          </div>

          <div className="about-cards">
            {missions.slice(0, 2).map((m) => (
              <article className="mission-card" key={m.number}>
                <div className="mission-number">{m.number}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about" style={{ paddingTop: 0 }}>
        <div className="container about-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {missions.slice(2).map((m) => (
            <article className="mission-card" key={m.number}>
              <div className="mission-number">{m.number}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
