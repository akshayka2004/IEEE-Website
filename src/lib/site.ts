export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const siteName = "IEEE Student Branch | Saintgits College of Engineering";
export const siteDescription =
  "IEEE Student Branch at Saintgits College of Engineering — a community of curious minds building technology through workshops, talks, hackathons and societies.";
/** Shown only when NEXT_PUBLIC_CONTACT_EMAIL is set — no guessed address on the public site. */
export const contactEmail: string | undefined = process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined;
export const ieeeJoinUrl = "https://www.ieee.org/membership/join";

export const contactPurposes = ["Membership", "Event", "Partnership", "Society", "Project", "Other"] as const;
export type ContactPurpose = (typeof contactPurposes)[number];

export const socials = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL },
].filter((s): s is { label: string; href: string } => Boolean(s.href));
