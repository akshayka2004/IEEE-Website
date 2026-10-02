import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";
import ContactForm from "@/components/ContactForm";
import { contactEmail, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | IEEE Student Branch",
  description: "Get in touch with the IEEE Student Branch at Saintgits College of Engineering.",
  alternates: { canonical: "/contact" },
};

const MAP_QUERY = "Saintgits College of Engineering, Kottayam, Kerala";

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Contact"
        title="Let's build something together."
        desc="Questions about membership, events or partnerships? Reach out — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="contact">
        <div className="container contact-grid">
          <div data-reveal="stagger">
            <div className="eyebrow">Get In Touch</div>
            <h2 className="section-title" style={{ fontSize: "clamp(32px, 3.2vw, 46px)", marginBottom: 24 }}>
              Send us a message.
            </h2>
            <ContactForm />
          </div>

          <div className="contact-cards" data-reveal="stagger">
            {contactEmail && (
              <div className="contact-card spot">
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </p>
              </div>
            )}
            <div className="contact-card spot">
              <h3>Address</h3>
              <p>Saintgits College of Engineering, Kottayam, Kerala, India</p>
            </div>
            <div className="contact-card spot">
              <h3>Office Hours</h3>
              <p>Monday – Friday, 9:00 AM – 4:00 PM</p>
            </div>
            {socials.length > 0 && (
              <div className="contact-card spot">
                <h3>Follow Us</h3>
                <p>
                  {socials.map((s, i) => (
                    <span key={s.label}>
                      {i > 0 && " · "}
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="container map-wrap" data-reveal="up">
          <iframe
            title="Map showing Saintgits College of Engineering"
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="btn btn-dark map-directions"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions →
          </a>
        </div>
      </section>

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
    </main>
  );
}
