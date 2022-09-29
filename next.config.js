const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
      {
        source: "/public/assets/html/privacypolicy.html",
        destination: "/pages/api/policy.js",
        source: "/privatepolicy",
        destination: "/assets/html/privacypolicy.html",
      },
    ],
 }

 module.exports = nextConfig