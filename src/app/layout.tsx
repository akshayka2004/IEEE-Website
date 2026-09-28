import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./dynamic.css";
import Navbar, { type Announcement } from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/Toast";
import RevealController from "@/components/RevealController";
import ScrollEffects from "@/components/ScrollEffects";
import Interactions from "@/components/Interactions";
import SearchPalette from "@/components/SearchPalette";
import { navLinks } from "@/lib/nav";
import { getNews } from "@/lib/content";
import { getNextEvent } from "@/lib/events";
import { buildSearchIndex } from "@/lib/search";
import { contactEmail, siteDescription, siteName, siteUrl, socials } from "@/lib/site";

export const revalidate = 3600;

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s" },
  description: siteDescription,
  applicationName: "IEEE Student Branch",
  openGraph: {
    type: "website",
    siteName: "IEEE Student Branch, Saintgits College of Engineering",
    title: siteName,
    description: siteDescription,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription },
};

export const viewport: Viewport = {
  themeColor: "#111820",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('ieee-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){document.documentElement.classList.add('js')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links = [...navLinks];
  if (getNews().length > 0) links.splice(links.length - 1, 0, { href: "/news", label: "News" });

  const next = getNextEvent();
  const announcement: Announcement | undefined = next
    ? {
        id: next.slug,
        text: `Registration open: ${next.title} · ${next.dateLabel}`,
        href: `/events/${next.slug}`,
        cta: "Register",
      }
    : undefined;

  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "IEEE Student Branch, Saintgits College of Engineering",
    url: siteUrl,
    email: contactEmail,
    sameAs: socials.map((s) => s.href),
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <ToastProvider>
          <Navbar links={links} announcement={announcement} />
          {children}
          <Footer hasNews={links.some((l) => l.href === "/news")} />
          <ScrollEffects />
          <RevealController />
          <Interactions />
          <SearchPalette items={buildSearchIndex()} />
        </ToastProvider>
        {plausible && <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      </body>
    </html>
  );
}
