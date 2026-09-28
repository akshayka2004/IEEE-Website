export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const siteName = "IEEE Student Branch | Saintgits College of Engineering";
export const siteDescription =
  "IEEE Student Branch at Saintgits College of Engineering — a community of curious minds building technology through workshops, talks, hackathons and societies.";
export const contactEmail = "ieee@saintgits.org";

export const socials = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL },
].filter((s): s is { label: string; href: string } => Boolean(s.href));
