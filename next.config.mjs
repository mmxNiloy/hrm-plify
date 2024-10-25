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
};

export default nextConfig;
