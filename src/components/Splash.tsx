"use client";

import { useEffect } from "react";

const MIN_MS = 1500;
const MAX_MS = 4500;

export default function Splash() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("splash-on")) return;

    try {
      sessionStorage.setItem("ieee-splash", "1");
    } catch {}

    const started = performance.now();
    let done = false;
    let removeTimer = 0;

    const finish = () => {
      if (done) return;
      done = true;
      root.classList.add("splash-out");
      removeTimer = window.setTimeout(() => root.classList.remove("splash-on", "splash-out"), 900);
    };

    const ready = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(finish, wait);
    };

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });

    const failsafe = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", ready);
      window.clearTimeout(failsafe);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-inner">
        <svg viewBox="0 0 120 120" width="112" height="112" className="splash-mark">
          <rect className="splash-diamond" x="30" y="30" width="60" height="60" transform="rotate(45 60 60)" pathLength="1" />
          <path className="splash-star" d="M60 44l4.2 11.8L76 60l-11.8 4.2L60 76l-4.2-11.8L44 60l11.8-4.2z" />
        </svg>
        <div className="splash-word">IEEE</div>
        <div className="splash-sub">Student Branch · Saintgits College of Engineering</div>
      </div>
      <div className="splash-bar">
        <span />
      </div>
    </div>
  );
}
