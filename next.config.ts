import path from "path";
import withPWA from "next-pwa";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@services": path.resolve(__dirname, "src/modules/blog/services"),
      "@components": path.resolve(__dirname, "src/components"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@context": path.resolve(__dirname, "src/context"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@lib": path.resolve(__dirname, "src/lib"),
    };
    return config;
  },

  async rewrites() {
    return [
      // ✅ Proxy for User API
      {
        source: "/proxy/users/:path*",
        destination: `${process.env.NEXT_PUBLIC_USER_API}/:path*`,
      },
      // ✅ Proxy for Comment API
      {
        source: "/proxy/comments/:path*",
        destination: `${process.env.NEXT_PUBLIC_COMMENT_API}/:path*`,
      },
      // ✅ General API Proxy
      {
        source: "/proxy/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default withPWAConfig(nextConfig);
