import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Image from "next/image";
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
        image="/campus/campus-2.jpg"
      />

      <section className="execom">
        <div className="container">
          <figure className="execom-cover" data-reveal="up">
            <Image
              src="/execom/cover.jpg"
              alt="The IEEE Execom 2026–27 team"
              width={1128}
              height={191}
              sizes="(max-width: 1240px) 100vw, 1240px"
              priority
            />
          </figure>
          <TeamGrid people={execom} />
        </div>
      </section>
    </main>
  );
}
