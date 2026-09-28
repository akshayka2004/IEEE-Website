"use client";

import { useEffect, useState } from "react";
import { useToast } from "./Toast";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const { toast } = useToast();
  const [canNative, setCanNative] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setCanNative(typeof navigator !== "undefined" && "share" in navigator), 0);
    return () => window.clearTimeout(id);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard", "success");
    } catch {
      toast("Couldn't copy the link", "error");
    }
  }

  return (
    <div className="share" role="group" aria-label="Share this page">
      <span className="share-label">Share</span>
      {canNative && (
        <button className="share-btn" onClick={() => navigator.share({ title, url }).catch(() => {})}>
          Share…
        </button>
      )}
      <button className="share-btn" onClick={copy}>
        Copy link
      </button>
      <a className="share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a className="share-btn" href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <a className="share-btn" href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className="share-btn" href={`mailto:?subject=${t}&body=${u}`}>
        Email
      </a>
    </div>
  );
}
