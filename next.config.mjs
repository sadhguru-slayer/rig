/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rigrills1.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  experimental: {
    serverComponents: true,  // enables React server components
  },
};

export default nextConfig;
