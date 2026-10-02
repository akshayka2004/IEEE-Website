"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import JoinLink from "./JoinLink";
import { OPEN_SEARCH_EVENT } from "./SearchPalette";

export type NavLink = { href: string; label: string };
export type Announcement = { id: string; text: string; href: string; cta: string };

export default function Navbar({ links, announcement }: { links: NavLink[]; announcement?: Announcement }) {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const lastY = useRef(0);
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > 24);
      if (y > 360 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y <= 360) setHidden(false);
      lastY.current = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!announcement) return;
    const id = window.setTimeout(() => {
      try {
        setDismissed(localStorage.getItem(`ieee-ann-${announcement.id}`) === "1");
      } catch {
        setDismissed(false);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [announcement]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const showBar = Boolean(announcement) && !dismissed;

  function dismiss() {
    setDismissed(true);
    if (announcement) {
      try {
        localStorage.setItem(`ieee-ann-${announcement.id}`, "1");
      } catch {}
    }
  }

  return (
    <header className={`nav${solid ? " nav--solid" : ""}${hidden && !open ? " nav--hidden" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {showBar && announcement && (
        <div className="announce" role="region" aria-label="Announcement">
          <div className="container announce-inner">
            <span className="announce-dot" aria-hidden="true" />
            <Link href={announcement.href} className="announce-link">
              <span>{announcement.text}</span>
              <strong>{announcement.cta} →</strong>
            </Link>
            <button className="announce-close" onClick={dismiss} aria-label="Dismiss announcement">
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="IEEE Student Branch, Saintgits College of Engineering — home">
          <div className="brand-mark" aria-hidden="true">
            <span>✦</span>
          </div>
          <div>
            <div className="brand-main">IEEE</div>
            <div className="brand-sub">Student Branch · Saintgits College of Engineering</div>
          </div>
        </Link>

        <nav className="nav-links" id="site-nav" aria-label="Primary" data-open={open}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "active" : ""}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <JoinLink className="nav-join">Join IEEE →</JoinLink>
        </nav>

        <div className="nav-tools">
          <button
            className="icon-btn"
            aria-label="Search the site"
            title="Search (Ctrl/⌘ + K)"
            onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <ThemeToggle />
        </div>

        <button
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
