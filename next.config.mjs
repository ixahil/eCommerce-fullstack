/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pexels.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "api-ecommerce.sahildev.pro",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
