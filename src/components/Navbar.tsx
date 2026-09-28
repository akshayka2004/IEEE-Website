"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="nav">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "active" : ""}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-join" href="/contact#newsletter">
            Join IEEE →
          </Link>
        </nav>

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
