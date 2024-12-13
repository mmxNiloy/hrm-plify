/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "artemis-production.up.railway.app",
        pathname: "uploads/*",
        protocol: "http",
      },
      {
        hostname: "artemis-production.up.railway.app",
        pathname: "uploads/*",
        protocol: "https",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
