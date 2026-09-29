"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Img from "./Img";
import Modal from "./Modal";
import type { GalleryPhoto } from "@/lib/data";

export default function GalleryGrid({ photos, initialCategory = "All" }: { photos: GalleryPhoto[]; initialCategory?: string }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(photos.map((p) => p.category)))], [photos]);
  const [category, setCategory] = useState(initialCategory);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const visible = useMemo(() => photos.filter((p) => category === "All" || p.category === category), [photos, category]);
  const current = openIndex !== null ? visible[openIndex] : undefined;

  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  const next = openIndex !== null ? visible[(openIndex + 1) % visible.length] : undefined;

  return (
    <>
      <div className="chip-row chip-row-light" role="group" aria-label="Filter photos" data-reveal="up">
        {categories.map((c) => (
          <button key={c} className={`chip${category === c ? " is-active" : ""}`} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="gallery-grid-full" key={category}>
        {visible.map((item, i) => (
          <button
            className="gallery-item shimmer card-in"
            style={{ animationDelay: `${Math.min(i, 10) * 45}ms` }}
            key={item.image}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo: ${item.caption}`}
          >
            <Img src={item.image} alt="" width={900} height={220} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw" />
            <span className="gallery-caption">{item.caption}</span>
          </button>
        ))}
      </div>

      <Modal open={openIndex !== null} onClose={() => setOpenIndex(null)} label="Photo viewer" className="lightbox">
        {current && (
          <div
            className="lightbox-body"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <button className="lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close viewer" data-autofocus>
              ✕
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
              ‹
            </button>
            <div className="lightbox-figure">
              <Image
                key={current.image}
                src={current.image}
                alt={current.caption}
                width={1600}
                height={1067}
                sizes="90vw"
                priority
                className="lightbox-img"
              />
              <p className="lightbox-caption">
                {current.caption} <span>· {current.category}</span>
                <span className="lightbox-count">
                  {(openIndex ?? 0) + 1} / {visible.length}
                </span>
              </p>
            </div>
            <button className="lightbox-nav lightbox-next" onClick={() => step(1)} aria-label="Next photo">
              ›
            </button>
            {next && <Image src={next.image} alt="" width={1600} height={1067} sizes="90vw" className="sr-only" aria-hidden="true" />}
          </div>
        )}
      </Modal>
    </>
  );
}
