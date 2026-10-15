import Link from "next/link";
import CountUp from "@/components/CountUp";
import EventsSection from "@/components/EventsSection";
import SocietySelector from "@/components/SocietySelector";
import NewsletterForm from "@/components/NewsletterForm";
import RotatingWord from "@/components/RotatingWord";
import HeroSlides from "@/components/HeroSlides";
import TeamGrid from "@/components/TeamGrid";
import Testimonials from "@/components/Testimonials";
import VideoFeature from "@/components/VideoFeature";
import NewsCard from "@/components/NewsCard";
import Img from "@/components/Img";
import JoinLink from "@/components/JoinLink";
import SocietiesMarquee from "@/components/SocietiesMarquee";
import BranchCounselor from "@/components/BranchCounselor";
import { officeBearers, missions, gallery } from "@/lib/data";
import { isLive } from "@/lib/pages";
import { getEvents, getStats } from "@/lib/events";
import { getNews, getTestimonials } from "@/lib/content";

const HERO_SLIDES = [
  { src: "/campus/campus-4.jpg", position: "50% 64%" },
  { src: "/campus/campus-2.jpg", position: "50% 72%" },
  { src: "/campus/campus-5.jpg", position: "50% 62%" },
  { src: "/campus/campus-6.jpg", position: "50% 76%" },
  { src: "/campus/campus-3.jpg", position: "50% 78%" },
  { src: "/campus/campus-1.jpg", position: "50% 80%" },
];

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STAT_ICONS: Record<string, React.ReactNode> = {
  Members: (
    <svg {...ICON_PROPS}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
      <path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18.5 14.8c1.6.7 2.6 2.4 3 5.2" />
    </svg>
  ),
  Activities: (
    <svg {...ICON_PROPS}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  ),
  Societies: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </svg>
  ),
  "Affinity Group": (
    <svg {...ICON_PROPS}>
      <path d="M12 20.5s-8-4.6-8-10.2A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 8 2.7c0 5.6-8 10.2-8 10.2z" />
    </svg>
  ),
  Achievements: (
    <svg {...ICON_PROPS}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1.5A3 3 0 0 0 7 10.5M17 6h3v1.5a3 3 0 0 1-3 3M12 14v4M8.5 20.5h7" />
    </svg>
  ),
};

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
          <HeroSlides slides={HERO_SLIDES} />
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
            {isLive("/events") ? (
              <Link href="/events" className="btn btn-primary">
                Explore Events →
              </Link>
            ) : (
              <Link href="/execom" className="btn btn-primary">
                Meet the Team →
              </Link>
            )}
            <JoinLink className="btn btn-outline">Join IEEE</JoinLink>
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
          <div className="stat-quote">
            Students
            <br />
            Driving
            <br />
            <em>Real Change.</em>
            <span>—</span>
          </div>
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-icon" aria-hidden="true">
                {STAT_ICONS[stat.label]}
              </span>
              <CountUp target={stat.count} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
              <small>{stat.note}</small>
            </div>
          ))}
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
              src="/campus/campus-3.jpg"
              alt="Saintgits College of Engineering campus"
              width={900}
              height={1200}
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

      <SocietiesMarquee />

      {isLive("/events") && <EventsSection events={events} limit={3} />}

      {isLive("/societies") && <SocietySelector events={events} />}

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

          <div className="execom-people">
            <BranchCounselor />
            <TeamGrid people={officeBearers} sizes="(max-width: 700px) 50vw, 20vw" />
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      {isLive("/gallery") && (
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
      )}

      {videoId && <VideoFeature id={videoId} />}

      {isLive("/news") && news.length > 0 && (
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
      {isLive("/newsletter") && (
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
      )}
    </main>
  );
}
