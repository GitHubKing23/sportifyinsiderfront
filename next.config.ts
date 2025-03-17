const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Enable alias support in Webpack
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

  // ✅ Enable Rewrites for API Calls
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/:path*",
      },
    ];
  },

  // ✅ Enable Optimized Image Loading in Next.js
  images: {
    domains: ["api.sportifyinsider.com", "localhost"], // ✅ Allow external image domains
  },

  // ✅ Enable Environment Variable Exposure
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
    NEXT_PUBLIC_WITH_CREDENTIALS: process.env.NEXT_PUBLIC_WITH_CREDENTIALS || "true",
    NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT || "10000",
  },
};

module.exports = nextConfig;
