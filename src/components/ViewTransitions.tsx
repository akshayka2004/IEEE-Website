"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type DocWithTransitions = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => { ready: Promise<void> };
};

export default function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    const doc = document as DocWithTransitions;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const anchor = (e.target as Element).closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.origin !== location.origin) return;

      const url = new URL(anchor.href);
      if (url.pathname === location.pathname && url.search === location.search) return;

      e.preventDefault();
      doc.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          router.push(url.pathname + url.search + url.hash);
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
