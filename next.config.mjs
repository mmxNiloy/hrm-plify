/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "primefaces.org",
        pathname: "**",
        protocol: "https",
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
