/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ Required for Docker builds
  reactStrictMode: true,

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
