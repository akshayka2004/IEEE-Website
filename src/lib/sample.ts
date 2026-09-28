/*
 * Placeholder content (testimonials, timeline, achievements, news, newsletter archive)
 * is visible in development and hidden from production builds unless
 * NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true, so invented claims never ship by accident.
 */
export const showSample =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_SAMPLE_CONTENT === "true";

export function live<T extends { sample?: boolean }>(items: T[]): T[] {
  return showSample ? items : items.filter((i) => !i.sample);
}
