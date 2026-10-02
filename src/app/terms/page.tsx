import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | IEEE Student Branch",
  description: "Terms of use for the IEEE Student Branch website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Legal"
        title="Terms of Use"
        desc="The ground rules for using this website."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
      />
      <section className="about">
        <div className="container prose">
          <h2>Use of this website</h2>
          <p>
            This website is maintained by the IEEE Student Branch at Saintgits College of Engineering to share
            information about the branch, its societies and its events. Please use it lawfully and respectfully.
          </p>
          <h2>Content</h2>
          <p>
            Event details, dates and team listings may change without notice. IEEE names and marks belong to their
            respective owners; this is a student branch website and not an official publication of IEEE.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact the branch
            {contactEmail ? (
              <>
                {" "}at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </>
            ) : null}
            .
          </p>
        </div>
      </section>
    </main>
  );
}
