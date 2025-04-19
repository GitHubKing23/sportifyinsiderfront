import path from "path";
import { NextConfig } from "next";
import withPWA from "next-pwa";

// ✅ Wrap PWA with ESM style
const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@services": path.resolve(__dirname, "src/modules/blog/services"),
      "@components": path.resolve(__dirname, "src/modules/navbar/components"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/comments/:path*",
        destination: `${process.env.NEXT_PUBLIC_COMMENT_API}/api/comments/:path*`,
      },
      {
        source: "/comments/:path*",
        destination: `${process.env.NEXT_PUBLIC_COMMENT_API}/api/comments/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

// ✅ Export the final config
export default withPWAConfig(nextConfig);
