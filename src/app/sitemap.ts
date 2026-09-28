import type { MetadataRoute } from "next";
import { events } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/events", "/execom", "/societies", "/gallery", "/contact", "/privacy", "/terms"];
  return [
    ...routes.map((r) => ({ url: `${siteUrl}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 })),
    ...events.map((e) => ({ url: `${siteUrl}/events/${e.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
