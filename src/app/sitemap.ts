import type { MetadataRoute } from "next";
import { rawEvents, societies } from "@/lib/data";
import { getNews } from "@/lib/content";
import { isLive } from "@/lib/pages";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority });

  const pages = ["", "/about", "/execom", "/events", "/societies", "/gallery", "/contact", "/join", "/newsletter", "/privacy", "/terms"].map((r) =>
    entry(r, r === "" ? 1 : 0.7)
  );
  const news = getNews();
  const detail = [
    ...(news.length > 0 ? [entry("/news", 0.6), ...news.map((p) => entry(`/news/${p.slug}`, 0.5))] : []),
    ...societies.map((s) => entry(`/societies/${s.slug}`, 0.5)),
    ...rawEvents.map((e) => entry(`/events/${e.slug}`, 0.5)),
  ];

  // Hidden routes redirect to the home page, so keep them out of the sitemap.
  return [...pages, ...detail].filter((e) => isLive(new URL(e.url).pathname));
}
