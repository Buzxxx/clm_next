/** @type {import('next').NextConfig} */
const nextConfig = {
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
