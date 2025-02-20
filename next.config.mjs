/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
