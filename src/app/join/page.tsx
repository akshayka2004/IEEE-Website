import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JoinStepper from "@/components/JoinStepper";
import Faq from "@/components/Faq";
import SectionDots from "@/components/SectionDots";

export const metadata: Metadata = {
  title: "Join the Branch | IEEE Student Branch",
  description: "Join the IEEE Student Branch at Saintgits College of Engineering — tell us about yourself and pick the societies you care about.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Join IEEE"
        title="Become part of the branch."
        desc="Three quick steps. Tell us about yourself, pick what interests you, and we'll take it from there."
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2200&q=85"
      />

      <SectionDots
        sections={[
          { id: "join-form", label: "Join form" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <section className="join" id="join-form">
        <div className="container join-grid">
          <div className="join-intro" data-reveal="stagger">
            <div className="eyebrow">Membership</div>
            <h2 className="section-title" style={{ fontSize: "clamp(32px, 3.4vw, 48px)" }}>
              Learn, build and connect.
            </h2>
            <p>
              Joining the branch gets you into workshops, talks, competitions and a community of students who like building things.
            </p>
            <ul className="join-perks">
              <li>Hands-on workshops and technical sessions</li>
              <li>Access to society projects and mentors</li>
              <li>Networking with peers, alumni and professionals</li>
              <li>Opportunities to organise events and lead</li>
            </ul>
          </div>

          <div data-reveal="up">
            <JoinStepper />
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal="stagger">
            <div className="eyebrow">Questions</div>
            <h2 className="section-title" id="faq-title" style={{ fontSize: "clamp(32px, 3.4vw, 48px)" }}>
              Good to know.
            </h2>
            <p className="section-copy">Can&apos;t find your answer? Use the contact page and we&apos;ll get back to you.</p>
          </div>
          <Faq />
        </div>
      </section>
    </main>
  );
}
