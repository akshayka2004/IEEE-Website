"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = () => [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")];

    if (reduce || !("IntersectionObserver" in window)) {
      targets().forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const start = window.setTimeout(() => targets().forEach((el) => io.observe(el)), 40);
    const failsafe = window.setTimeout(() => targets().forEach((el) => el.classList.add("is-visible")), 4000);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
