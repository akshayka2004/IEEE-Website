# IEEE Student Branch — Saintgits College of Engineering

Next.js 16 (App Router, TypeScript) website for the IEEE Student Branch.

## Pages

**Live:** `/` · `/about` · `/execom`

**Built but hidden:** `/events` (+ detail) · `/societies` (+ detail) · `/gallery` · `/news` · `/newsletter` · `/join` · `/contact` · `/privacy` · `/terms`

Hidden routes redirect to the home page and disappear from navigation, footer, search, sitemap and home-page sections. To re-launch one, delete its line from `HIDDEN_ROUTES` in `src/lib/pages.ts` and redeploy — no other change needed.

## Features

- **Motion:** scroll reveals, sticky auto-hiding navbar, scroll-progress bar, rotating hero word, spotlight cards, magnetic buttons, page fade, image fade-in. All respect `prefers-reduced-motion`.
- **Events:** live countdown, filter/search, list + month-calendar views, per-event pages with registration form, Google Calendar link and `.ics` download, Event structured data.
- **People & places:** team profile modals, society pages with related events, gallery lightbox with category filter and swipe/keyboard support.
- **Content:** news with reading time and share buttons, FAQ accordion, timeline, achievements wall, testimonials carousel, newsletter archive.
- **Utilities:** dark mode (system-aware, no flash), ⌘/Ctrl + K search palette, announcement bar, toast notifications, back-to-top, map embed, multi-step join form.
- **Quality:** sitemap, robots, Open Graph, security headers, skip link, focus management, honeypot spam protection.

## Develop

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local` (or set these in your host):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL — canonical links, sitemap, Open Graph |
| `FORMS_WEBHOOK_URL` | Contact, newsletter, event-registration and join submissions are POSTed here as JSON (`type`: `contact` / `newsletter` / `registration` / `join`). **Required in production** — without it the forms return an error instead of silently dropping messages. Point it at Google Apps Script, Formspree, Zapier/Make, etc. to store rows, send confirmation emails or export attendee lists |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email. Not shown anywhere until set |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_YOUTUBE_URL` | Social links; each is hidden until set |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables cookie-free Plausible analytics |
| `NEXT_PUBLIC_YOUTUBE_FEATURED_ID` | Shows a featured video on the home page |
| `NEXT_PUBLIC_SHOW_SAMPLE_CONTENT` | Set to `true` to show placeholder testimonials/timeline/achievements/news in production builds |

## Content

Editable content lives in `src/lib/data.ts` (events, execom, societies, gallery, stats) and `src/lib/content.ts` (news, timeline, achievements, testimonials, newsletter issues, FAQ). Event dates decide upcoming vs past automatically (pages refresh hourly). Everything shipped is placeholder content from the design mock-up — replace it before launch. Items marked `sample: true` in `content.ts` are hidden in production builds until you replace them and remove the flag.
