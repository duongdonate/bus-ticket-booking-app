/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Bỏ qua lỗi TypeScript khi build trên Vercel
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["avatar.iran.liara.run"],
  },
};

module.exports = nextConfig;
