import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TeamGrid from "@/components/TeamGrid";
import { execom } from "@/lib/data";

export const metadata: Metadata = {
  title: "Execom | IEEE Student Branch",
  description: "Meet the executive committee of the IEEE Student Branch at Saintgits College of Engineering.",
  alternates: { canonical: "/execom" },
};

export default function ExecomPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Execom ·"
        title="The people behind the branch."
        desc="A team of passionate students working to create opportunities, build communities and drive impact."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="execom">
        <div className="container">
          <TeamGrid people={execom} />
        </div>
      </section>
    </main>
  );
}
