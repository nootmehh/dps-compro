import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gvzumtjmwgveehwmkyeg.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.dpsmarkajalan.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "devdpscompro.netlify.app",
          },
        ],
        destination: "https://dev.dpsmarkajalan.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "dpscompro.netlify.app",
          },
        ],
        destination: "https://dpsmarkajalan.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
