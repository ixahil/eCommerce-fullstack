/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pexels.com",
      },
      {
        hostname: "api-ecommerce.sahildev.pro",
      },
    ],
  },
};

export default nextConfig;
