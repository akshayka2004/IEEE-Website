import type { NextConfig } from "next";
import { HIDDEN_ROUTES } from "./src/lib/pages";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return HIDDEN_ROUTES.flatMap((route) => [
      { source: route, destination: "/", permanent: false },
      { source: `${route}/:path*`, destination: "/", permanent: false },
    ]);
  },
};

export default nextConfig;
