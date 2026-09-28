"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/content";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, 6500);
    return () => window.clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div data-reveal="stagger">
          <div className="eyebrow">In their words</div>
          <h2 className="section-title" id="testimonials-title">
            Why members stay.
          </h2>
        </div>

        <div
          className="carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Member testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {items.map((t, i) => (
              <figure className="carousel-slide" key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} aria-hidden={i !== index}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="icon-btn icon-btn-light" onClick={() => go(index - 1)} aria-label="Previous testimonial">
              ‹
            </button>
            <div className="carousel-dots">
              {items.map((_, i) => (
                <button key={i} className={i === index ? "is-active" : ""} onClick={() => go(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === index} />
              ))}
            </div>
            <button className="icon-btn icon-btn-light" onClick={() => go(index + 1)} aria-label="Next testimonial">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
