# IEEE Student Branch — Saintgits College of Engineering

Next.js 16 (App Router, TypeScript) website for the IEEE Student Branch.

## Pages

`/` · `/about` · `/events` · `/events/[slug]` · `/execom` · `/societies` · `/gallery` · `/contact` · `/privacy` · `/terms`

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
| `FORMS_WEBHOOK_URL` | Contact + newsletter submissions are POSTed here as JSON. **Required in production** — without it the forms return an error instead of silently dropping messages |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_YOUTUBE_URL` | Social links; each is hidden until set |

## Content

All editable content (events, execom, societies, gallery, stats) lives in `src/lib/data.ts`; the contact email lives in `src/lib/site.ts`. Sample data and stock photos are placeholders — replace before launch.
