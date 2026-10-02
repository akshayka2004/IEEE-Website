import { execom, societies } from "./data";
import { getNews } from "./content";
import { getEvents } from "./events";
import { isLive } from "./pages";

export type SearchItem = {
  type: "Page" | "Event" | "Society" | "Person" | "News";
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string;
};

export function buildSearchIndex(): SearchItem[] {
  const pages: SearchItem[] = [
    { type: "Page", title: "Home", href: "/", keywords: "landing start" },
    { type: "Page", title: "About", href: "/about", keywords: "mission vision values history" },
    { type: "Page", title: "Events", href: "/events", keywords: "workshops talks hackathon calendar" },
    { type: "Page", title: "Execom", href: "/execom", keywords: "team committee people" },
    { type: "Page", title: "Societies", href: "/societies", keywords: "communities groups" },
    { type: "Page", title: "Gallery", href: "/gallery", keywords: "photos pictures" },
    { type: "Page", title: "Contact", href: "/contact", keywords: "email message map address" },
    { type: "Page", title: "Join IEEE", href: "/join", keywords: "membership sign up register volunteer faq" },
    { type: "Page", title: "Newsletter", href: "/newsletter", keywords: "subscribe updates issues" },
  ];

  const events: SearchItem[] = getEvents().map((e) => ({
    type: "Event",
    title: e.title,
    subtitle: `${e.dateLong} · ${e.tag}`,
    href: `/events/${e.slug}`,
    keywords: e.desc,
  }));

  const soc: SearchItem[] = societies.map((s) => ({
    type: "Society",
    title: s.name,
    subtitle: s.desc,
    href: `/societies/${s.slug}`,
    keywords: s.focus.join(" "),
  }));

  const people: SearchItem[] = execom.map((p) => ({
    type: "Person",
    title: p.name,
    subtitle: p.role,
    href: "/execom",
  }));

  const news: SearchItem[] = getNews().map((n) => ({
    type: "News",
    title: n.title,
    subtitle: n.excerpt,
    href: `/news/${n.slug}`,
  }));

  return [...pages, ...events, ...soc, ...people, ...news].filter((i) => isLive(i.href));
}
