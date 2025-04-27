// next.config.js (final)
const path    = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',   // no SW during local dev
});

const nextConfig = {
  /* ─ Webpack aliases ─────────────────────────────────── */
  webpack(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@services':   path.resolve(__dirname, 'src/services'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@modules':    path.resolve(__dirname, 'src/modules'),
      '@context':    path.resolve(__dirname, 'src/context'),
      '@utils':      path.resolve(__dirname, 'src/utils'),
      '@lib':        path.resolve(__dirname, 'src/lib'),
    };
    return config;
  },

  /* ─ API / proxy rewrites ────────────────────────────── */
  async rewrites() {
    return [
      {
        source: '/proxy/users/:path*',
        destination: `${process.env.NEXT_PUBLIC_USER_API}/:path*`,
      },
      {
        source: '/proxy/comments/:path*',
        destination: `${process.env.NEXT_PUBLIC_COMMENT_API}/:path*`,
      },
      {
        source: '/proxy/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
