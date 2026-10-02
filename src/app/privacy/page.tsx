import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | IEEE Student Branch",
  description: "How the IEEE Student Branch website handles your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        desc="What we collect through this website, and what we do with it."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
      />
      <section className="about">
        <div className="container prose">
          <h2>Information we collect</h2>
          <p>
            We only collect information you choose to submit: your name, email address and message through the contact
            form; your email address if you subscribe to the newsletter; your name, email, department and year if you
            register for an event or ask to join the branch (along with any interests or comments you add).
          </p>
          <h2>How we use it</h2>
          <p>
            Contact messages are used to reply to your enquiry. Newsletter addresses are used to send branch updates,
            and you can ask to be removed at any time. We do not sell or share your information with third parties for
            marketing.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            This website does not set tracking cookies. Your theme preference (light or dark) and whether you dismissed
            an announcement are stored in your browser only. If cookie-free analytics is enabled, it records anonymous
            page-view counts and does not track individuals.
          </p>
          <h2>Your choices</h2>
          <p>
            To access, correct or delete the information you have sent us, contact the branch
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
