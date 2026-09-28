import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import EventsSection from "@/components/EventsSection";
import SocietiesMarquee from "@/components/SocietiesMarquee";
import NewsletterForm from "@/components/NewsletterForm";
import { stats, execom, missions } from "@/lib/data";

export default function Home() {
  return (
    <main id="home">
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-kicker">
            <span>Ideas</span>
            <span>People</span>
            <span>Technology</span>
            <span>Community</span>
          </div>

          <h1>
            Engineering
            <br />
            <em>a better</em>
            <br />
            tomorrow.
          </h1>

          <p className="hero-desc">
            A community of curious minds, innovators and change-makers building technology for a
            sustainable and inclusive world.
          </p>

          <div className="hero-actions">
            <Link href="/events" className="btn btn-primary">
              Explore Events →
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Join IEEE
            </Link>
          </div>

          <div className="hero-meta">Saintgits College of Engineering · IEEE Student Branch</div>
        </div>

        <div className="hero-index">SCROLL TO EXPLORE</div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <CountUp target={stat.count} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
              <small>{stat.note}</small>
            </div>
          ))}
          <div className="stat-quote">
            Students
            <br />
            Driving
            <br />
            <em>Real Change.</em>
            <span>—</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="container about-grid">
          <div className="about-copy">
            <div className="eyebrow">About IEEE SB</div>
            <h2 className="section-title">More than a student branch.</h2>
            <p>
              IEEE Student Branch at Saintgits College of Engineering brings together curious minds
              who want to explore technology beyond the classroom. Through technical sessions,
              workshops, competitions and professional interactions, we create opportunities to
              learn, build and connect.
            </p>
            <Link href="/about" className="btn btn-dark">
              Know More →
            </Link>
          </div>

          <div className="about-image">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85"
              alt="Students collaborating"
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

      <EventsSection limit={3} showViewAll />

      <SocietiesMarquee />

      {/* EXECOM */}
      <section className="execom" id="execom">
        <div className="container execom-grid">
          <div className="execom-copy">
            <div className="eyebrow">Execom ·</div>
            <h2 className="section-title">The people behind the branch.</h2>
            <p>A team of passionate students working to create opportunities, build communities and drive impact.</p>
            <Link href="/execom" className="btn btn-dark">
              Meet the Full Team →
            </Link>
          </div>

          <div className="people">
            {execom.slice(0, 4).map((person) => (
              <article className="person" key={person.name}>
                <div className="person-photo">
                  <Image src={person.image} alt={person.name} width={500} height={240} />
                </div>
                <div className="person-info">
                  <div className="person-name">{person.name}</div>
                  <div className="person-role">{person.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="gallery-head">
            <div>
              <div className="eyebrow">Gallery</div>
              <h2 className="section-title">Moments that matter.</h2>
              <p className="section-copy">
                A glimpse into our events, workshops, competitions and community activities.
              </p>
            </div>
            <Link href="/gallery" className="btn btn-dark">
              View Gallery →
            </Link>
          </div>

          <div className="gallery-grid">
            {[
              { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85", caption: "IEEE Event" },
              { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85", caption: "Workshop" },
              { image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85", caption: "Community" },
              { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85", caption: "Team" },
              { image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=85", caption: "Competition" },
              { image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85", caption: "Activity" },
            ].map((item, i) => (
              <div className="gallery-item" key={i}>
                <Image src={item.image} alt="" width={1000} height={210} />
                <div className="gallery-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter" id="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-copy">
            <div className="eyebrow">Newsletter</div>
            <h2 className="section-title">IEEE SB Inside</h2>
            <p>Stories, achievements, events and opportunities delivered to your inbox.</p>
          </div>

          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
