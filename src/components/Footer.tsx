import Link from "next/link";
import { isLive } from "@/lib/pages";
import { contactEmail, ieeeJoinUrl, socials } from "@/lib/site";

type Item = { href: string; label: string };

const explore: Item[] = [
  { href: "/about", label: "About" },
  { href: "/execom", label: "Execom" },
  { href: "/societies", label: "Societies" },
  { href: "/join", label: "Join the branch" },
].filter((i) => isLive(i.href));

const activities: Item[] = [
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/gallery", label: "Gallery" },
].filter((i) => isLive(i.href));

const legal: Item[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
].filter((i) => isLive(i.href));

const resources = [
  { href: "https://www.ieee.org", label: "IEEE" },
  { href: "https://ieeexplore.ieee.org", label: "IEEE Xplore" },
  { href: "https://www.ieee.org/membership", label: "Student Resources" },
  { href: ieeeJoinUrl, label: "Join IEEE" },
];

export default function Footer() {
  const showContact = isLive("/contact");
  const hasConnect = socials.length > 0 || showContact || Boolean(contactEmail);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-mark">
                <span>✦</span>
              </div>
              <div>
                <div className="brand-main">IEEE</div>
                <div className="brand-sub">Student Branch · Saintgits College of Engineering</div>
              </div>
            </div>
            <p>Engineering ideas into meaningful impact through technology, collaboration and student leadership.</p>
            <div className="footer-tagline">People. Ideas. Impact.</div>
          </div>

          {explore.length > 0 && (
            <div className="footer-col">
              <h4>Explore</h4>
              {explore.map((i) => (
                <Link key={i.href} href={i.href}>
                  {i.label}
                </Link>
              ))}
            </div>
          )}

          {activities.length > 0 && (
            <div className="footer-col">
              <h4>Activities</h4>
              {activities.map((i) => (
                <Link key={i.href} href={i.href}>
                  {i.label}
                </Link>
              ))}
            </div>
          )}

          {hasConnect && (
            <div className="footer-col">
              <h4>Connect</h4>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
              {showContact && <Link href="/contact">Contact</Link>}
              {contactEmail && <a href={`mailto:${contactEmail}`}>Email</a>}
            </div>
          )}

          <div className="footer-col">
            <h4>Resources</h4>
            {resources.map((r) => (
              <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer">
                {r.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IEEE Student Branch, Saintgits College of Engineering. All rights reserved.</span>
          {legal.length > 0 && (
            <span>
              {legal.map((i, n) => (
                <span key={i.href}>
                  {n > 0 && " · "}
                  <Link href={i.href}>{i.label}</Link>
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
