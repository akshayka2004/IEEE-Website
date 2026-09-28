"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <div className="brand-mark">
            <span>✦</span>
          </div>
          <div>
            <div className="brand-main">IEEE</div>
            <div className="brand-sub">Student Branch · Saintgits College of Engineering</div>
          </div>
        </Link>

        <nav className="nav-links" data-open={open}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-join" href="/contact" onClick={() => setOpen(false)}>
            Join IEEE →
          </Link>
        </nav>

        <button
          className="mobile-toggle"
          aria-label="Open navigation"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
