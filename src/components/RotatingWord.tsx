"use client";

import { useEffect, useState } from "react";

const WORDS = ["tomorrow.", "future.", "campus.", "world."];

export default function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % WORDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span className="sr-only">tomorrow.</span>
      <span className="rotating-word" aria-hidden="true" key={i}>
        {WORDS[i]}
      </span>
    </>
  );
}
