/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ Required for Docker builds
  reactStrictMode: true,
  experimental: { appDir: true }, // ✅ Ensure Next.js handles assets correctly

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/contracts",
      },
    ];
  },
};

export default nextConfig;
