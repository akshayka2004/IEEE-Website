"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/lib/search";

export const OPEN_SEARCH_EVENT = "ieee:open-search";

function score(item: SearchItem, tokens: string[]): number {
  const title = item.title.toLowerCase();
  const rest = `${item.subtitle ?? ""} ${item.keywords ?? ""} ${item.type}`.toLowerCase();
  let total = 0;
  for (const t of tokens) {
    if (title.startsWith(t)) total += 6;
    else if (title.includes(t)) total += 4;
    else if (rest.includes(t)) total += 1;
    else return 0;
  }
  return total;
}

export default function SearchPalette({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previous = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return items.filter((i) => i.type === "Page").slice(0, 8);
    return items
      .map((item) => ({ item, s: score(item, tokens) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.item);
  }, [items, query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        previous.current = document.activeElement as HTMLElement | null;
        setOpen((v) => !v);
      }
    };
    const onOpen = () => {
      previous.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      previous.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  function go(item: SearchItem) {
    close();
    router.push(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop search-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search the site" onKeyDown={onKeyDown}>
        <div className="search-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
            aria-label="Search events, societies, people and pages"
            placeholder="Search events, societies, people, pages…"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <ul id="search-results" ref={listRef} role="listbox" className="search-results">
          {results.length === 0 && <li className="search-empty">No results for “{query}”.</li>}
          {results.map((item, i) => (
            <li
              key={`${item.type}-${item.href}-${item.title}`}
              id={`search-opt-${i}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? "is-active" : undefined}
              onMouseMove={() => setActive(i)}
              onClick={() => go(item)}
            >
              <span className="search-type">{item.type}</span>
              <span className="search-text">
                <span className="search-title">{item.title}</span>
                {item.subtitle && <span className="search-sub">{item.subtitle}</span>}
              </span>
            </li>
          ))}
        </ul>

        <div className="search-foot">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}
