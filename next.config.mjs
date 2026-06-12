/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // While developing locally without a proper image server
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
