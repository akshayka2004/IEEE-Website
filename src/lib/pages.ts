/*
 * Page visibility switch.
 *
 * Routes listed here stay in the codebase but are hidden from visitors:
 * they redirect to the home page, and disappear from navigation, footer,
 * search, sitemap and home-page sections.
 *
 * To re-launch a page, delete its line below and redeploy.
 */
export const HIDDEN_ROUTES = [
  "/events",
  "/societies",
  "/gallery",
  "/news",
  "/newsletter",
  "/join",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export function isLive(href: string): boolean {
  const path = href.split(/[?#]/)[0];
  return !HIDDEN_ROUTES.some((r) => path === r || path.startsWith(`${r}/`));
}
