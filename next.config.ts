import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Auth routes
      {
        source: "/sign-in",
        destination: "/routes/sign-in",
        permanent: false,
      },
      {
        source: "/sign-up",
        destination: "/routes/sign-up",
        permanent: false,
      },
      // Dashboard routes
      {
        source: "/schedule",
        destination: "/routes/dashboard/schedule",
        permanent: false,
      },
      {
        source: "/ideas",
        destination: "/routes/dashboard/ideas",
        permanent: false,
      },
      {
        source: "/settings",
        destination: "/routes/dashboard/settings",
        permanent: false,
      },
      {
        source: "/billing",
        destination: "/routes/dashboard/billing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
