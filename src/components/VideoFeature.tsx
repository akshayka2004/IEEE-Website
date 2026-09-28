"use client";

import { useState } from "react";

export default function VideoFeature({ id, title = "Featured video" }: { id: string; title?: string }) {
  const [play, setPlay] = useState(false);

  return (
    <section className="video-section" aria-labelledby="video-title">
      <div className="container">
        <div data-reveal="stagger">
          <div className="eyebrow">Watch</div>
          <h2 className="section-title" id="video-title">
            See us in action.
          </h2>
        </div>

        <div className="video-frame" data-reveal="up">
          {play ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button className="video-poster" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="video-play" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
