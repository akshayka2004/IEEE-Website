import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { societies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Societies | IEEE Student Branch",
  description: "Explore the IEEE societies active at Saintgits College of Engineering.",
  alternates: { canonical: "/societies" },
};

export default function SocietiesPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Societies ·"
        title="Explore our communities."
        desc="Special interest groups. Shared passion. Greater impact."
        image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="societies">
        <div className="container">
          <div className="societies-grid-static" data-reveal="stagger">
            {societies.map((society) => (
              <Link href={`/societies/${society.slug}`} className="society-wrap spot" key={society.code}>
                <div>
                  <div className="society-logo">{society.code}</div>
                  <span className="society-name">{society.name}</span>
                  <p className="society-desc">{society.desc}</p>
                  <span className="society-more">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
