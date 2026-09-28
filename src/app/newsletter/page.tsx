import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";
import { getIssues } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Newsletter | IEEE Student Branch",
  description: "Subscribe to IEEE SB Inside and browse past issues of the IEEE Student Branch newsletter.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  const issues = getIssues();

  return (
    <main id="main">
      <PageHero
        kicker="Newsletter"
        title="IEEE SB Inside."
        desc="Stories, achievements, events and opportunities delivered to your inbox."
        image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="newsletter" id="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-copy" data-reveal="stagger">
            <div className="eyebrow">Subscribe</div>
            <h2 className="section-title">Never miss an update.</h2>
            <p>One email when there is something worth reading. No spam, unsubscribe any time.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="archive">
        <div className="container">
          <div data-reveal="stagger">
            <div className="eyebrow">Archive</div>
            <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
              Past issues
            </h2>
          </div>

          {issues.length === 0 ? (
            <p className="archive-empty" data-reveal="up">
              Our first issue is on its way. Subscribe above to receive it.
            </p>
          ) : (
            <ul className="archive-list" data-reveal="stagger">
              {issues.map((issue) => (
                <li className="archive-item spot" key={issue.title}>
                  <div>
                    <span className="archive-date">{formatDate(issue.date)}</span>
                    <h3>{issue.title}</h3>
                    <p>{issue.summary}</p>
                  </div>
                  {issue.href && (
                    <a className="event-link" href={issue.href} target="_blank" rel="noopener noreferrer">
                      Read issue →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
