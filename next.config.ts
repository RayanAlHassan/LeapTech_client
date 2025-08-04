import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/api/uploads/images/**", // <-- ✅ includes /api now
      },
      {
        protocol: "https",
        hostname: "leaptechkw.com",
        pathname: "api/uploads/images/**",
      },
    ],
  },
};

export default nextConfig;
