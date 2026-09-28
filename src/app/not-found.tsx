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
        <div className="container" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-dark">
            Back to home →
          </Link>
          <Link href="/events" className="btn btn-primary">
            Explore events →
          </Link>
        </div>
      </section>
    </main>
  );
}
