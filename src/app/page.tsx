import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import EventsSection from "@/components/EventsSection";
import SocietiesMarquee from "@/components/SocietiesMarquee";
import NewsletterForm from "@/components/NewsletterForm";
import RotatingWord from "@/components/RotatingWord";
import TeamGrid from "@/components/TeamGrid";
import Testimonials from "@/components/Testimonials";
import VideoFeature from "@/components/VideoFeature";
import NewsCard from "@/components/NewsCard";
import Img from "@/components/Img";
import { execom, missions, gallery } from "@/lib/data";
import { getEvents, getStats } from "@/lib/events";
import { getNews, getTestimonials } from "@/lib/content";

export default function Home() {
  const stats = getStats();
  const events = getEvents();
  const news = getNews().slice(0, 3);
  const testimonials = getTestimonials();
  const videoId = process.env.NEXT_PUBLIC_YOUTUBE_FEATURED_ID;

  return (
    <main id="main">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="hero-img"
          />
        </div>
        <div className="container hero-content">
          <div className="hero-kicker">
            <span>Ideas</span>
            <span>People</span>
            <span>Technology</span>
            <span>Community</span>
          </div>

          <h1 className="split-heading hero-h1">
            <span className="split-word">
              <span className="split-word-inner" style={{ animationDelay: "0.1s" }}>
                Engineering
              </span>
            </span>
            <br />
            <em className="split-word">
              <span className="split-word-inner" style={{ animationDelay: "0.22s" }}>
                a better
              </span>
            </em>
            <br />
            <span className="split-word">
              <span className="split-word-inner" style={{ animationDelay: "0.34s" }}>
                <RotatingWord />
              </span>
            </span>
          </h1>

          <p className="hero-desc">
            A community of curious minds, innovators and change-makers building technology for a
            sustainable and inclusive world.
          </p>

          <div className="hero-actions">
            <Link href="/events" className="btn btn-primary">
              Explore Events →
            </Link>
            <Link href="/join" className="btn btn-outline">
              Join IEEE
            </Link>
          </div>

          <div className="hero-meta">Saintgits College of Engineering · IEEE Student Branch</div>
        </div>

        <div className="hero-index" aria-hidden="true">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats-grid" data-reveal="stagger">
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
          <div className="about-copy" data-reveal="stagger">
            <div className="eyebrow">About IEEE SB</div>
            <h2 className="section-title">More than a student branch.</h2>
            <p>
              IEEE Student Branch at Saintgits College of Engineering brings together curious minds
              who want to explore technology beyond the classroom. Through technical sessions,
              workshops, competitions and professional interactions, we create opportunities to
              learn, build and connect.
            </p>
            <div>
              <Link href="/about" className="btn btn-dark">
                Know More →
              </Link>
            </div>
          </div>

          <div className="about-image shimmer" data-reveal="up">
            <Img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85"
              alt="Students collaborating"
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

      <EventsSection events={events} limit={3} />

      <SocietiesMarquee />

      {/* EXECOM */}
      <section className="execom" id="execom">
        <div className="container execom-grid">
          <div className="execom-copy" data-reveal="stagger">
            <div className="eyebrow">Execom ·</div>
            <h2 className="section-title">The people behind the branch.</h2>
            <p>A team of passionate students working to create opportunities, build communities and drive impact.</p>
            <div>
              <Link href="/execom" className="btn btn-dark">
                Meet the Full Team →
              </Link>
            </div>
          </div>

          <TeamGrid people={execom.slice(0, 4)} sizes="(max-width: 700px) 50vw, 20vw" />
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="gallery-head" data-reveal="stagger">
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

          <div className="gallery-grid" data-reveal="stagger">
            {gallery.slice(0, 6).map((item) => (
              <Link href="/gallery" className="gallery-item shimmer" key={item.image} aria-label={`Open gallery — ${item.caption}`}>
                <Img src={item.image} alt="" width={1000} height={210} sizes="(max-width: 700px) 50vw, 30vw" />
                <div className="gallery-caption">{item.caption}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {videoId && <VideoFeature id={videoId} />}

      {news.length > 0 && (
        <section className="news-section" aria-labelledby="news-title">
          <div className="container">
            <div className="gallery-head" data-reveal="stagger">
              <div>
                <div className="eyebrow">Latest</div>
                <h2 className="section-title" id="news-title">
                  News &amp; stories.
                </h2>
              </div>
              <Link href="/news" className="btn btn-dark">
                All News →
              </Link>
            </div>
            <div className="news-grid" data-reveal="stagger">
              {news.map((post) => (
                <NewsCard post={post} key={post.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Testimonials items={testimonials} />

      {/* NEWSLETTER */}
      <section className="newsletter" id="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-copy" data-reveal="stagger">
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
