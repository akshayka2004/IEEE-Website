"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; position: string };

const INTERVAL_MS = 7000;

export default function HeroSlides({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  // Only the first slide is rendered for the initial paint; the rest mount after the page has loaded.
  const [mounted, setMounted] = useState(1);

  useEffect(() => {
    const mountRest = () => setMounted(slides.length);
    if (document.readyState === "complete") {
      const id = window.setTimeout(mountRest, 400);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", mountRest, { once: true });
    return () => window.removeEventListener("load", mountRest);
  }, [slides.length]);

  useEffect(() => {
    if (mounted < slides.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [mounted, slides.length]);

  return (
    <>
      {slides.slice(0, mounted).map((slide, i) => (
        <div className={`hero-slide${i === active ? " is-active" : ""}`} key={slide.src}>
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: slide.position }}
            className="hero-img"
          />
        </div>
      ))}
    </>
  );
}
