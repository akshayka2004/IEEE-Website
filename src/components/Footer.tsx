import Link from "next/link";

export default function Footer() {
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

          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/about">About</Link>
            <Link href="/execom">Execom</Link>
            <Link href="/societies">Societies</Link>
          </div>

          <div className="footer-col">
            <h4>Activities</h4>
            <Link href="/events">Events</Link>
            <Link href="/contact">Newsletter</Link>
            <Link href="/gallery">Gallery</Link>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="mailto:ieee@saintgits.org">Email</a>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer">IEEE</a>
            <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer">IEEE Xplore</a>
            <a href="https://www.ieee.org/membership" target="_blank" rel="noopener noreferrer">Student Resources</a>
            <a href="https://www.ieee.org/membership/join" target="_blank" rel="noopener noreferrer">Join IEEE</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 IEEE Student Branch, Saintgits College of Engineering. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use</span>
        </div>
      </div>
    </footer>
  );
}
