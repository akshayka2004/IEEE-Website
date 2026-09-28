import type { MetadataRoute } from "next";
import { rawEvents, societies } from "@/lib/data";
import { getNews } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/events", "/execom", "/societies", "/gallery", "/contact", "/join", "/newsletter", "/privacy", "/terms"];
  const news = getNews();
  const entry = (path: string, priority: number) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority });

  return [
    ...routes.map((r) => entry(r, r === "" ? 1 : 0.7)),
    ...(news.length > 0 ? [entry("/news", 0.6), ...news.map((p) => entry(`/news/${p.slug}`, 0.5))] : []),
    ...societies.map((s) => entry(`/societies/${s.slug}`, 0.5)),
    ...rawEvents.map((e) => entry(`/events/${e.slug}`, 0.5)),
  ];
}
