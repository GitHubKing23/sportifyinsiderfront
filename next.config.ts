module.exports = {
  reactStrictMode: true, // Enable React Strict Mode for better error reporting
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5000/api/:path*",
      },
    ];
  },
};