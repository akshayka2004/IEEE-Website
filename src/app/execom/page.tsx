import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { execom } from "@/lib/data";

export const metadata: Metadata = {
  title: "Execom | IEEE Student Branch",
  description: "Meet the executive committee of the IEEE Student Branch at Saintgits College of Engineering.",
};

export default function ExecomPage() {
  return (
    <main>
      <PageHero
        kicker="Execom ·"
        title="The people behind the branch."
        desc="A team of passionate students working to create opportunities, build communities and drive impact."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="execom">
        <div className="container">
          <div className="people">
            {execom.map((person) => (
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
    </main>
  );
}
