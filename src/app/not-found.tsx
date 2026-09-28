import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <main id="main">
      <PageHero
        kicker="Error 404"
        title="Page not found."
        desc="The page you're looking for doesn't exist or has moved."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
      />
      <section className="about">
        <div className="container notfound">
          <svg className="orbit" viewBox="0 0 200 200" width="180" height="180" aria-hidden="true">
            <circle cx="100" cy="100" r="78" className="orbit-ring" />
            <circle cx="100" cy="100" r="52" className="orbit-ring orbit-ring-2" />
            <g className="orbit-dot-group">
              <circle cx="100" cy="22" r="7" className="orbit-dot" />
            </g>
            <rect x="82" y="82" width="36" height="36" transform="rotate(45 100 100)" className="orbit-mark" />
            <path d="M100 88l3.2 8.8L112 100l-8.8 3.2L100 112l-3.2-8.8L88 100l8.8-3.2z" className="orbit-star" />
          </svg>
          <div className="notfound-actions">
            <Link href="/" className="btn btn-dark">
              Back to home →
            </Link>
            <Link href="/events" className="btn btn-primary">
              Explore events →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
