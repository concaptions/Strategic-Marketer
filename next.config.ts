import type { NextConfig } from "next";

/* Security headers (audit 2026-08-20). HSTS comes from Vercel already.
   No full CSP yet: Next's inline runtime scripts + framer would need a nonce
   pipeline; revisit if the site ever takes user data server-side. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
