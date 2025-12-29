/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.reddyantibirdsolutions.com",
      },
    ],
  },
  experimental: {
    serverComponents: true,
  },
};

export default nextConfig;