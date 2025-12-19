/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "rigrills.6c2fecf3fdf96cbc1089bae73a5a2e68.r2.cloudflarestorage.com",
      },
    ],
  },
  experimental: {
    serverComponents: true,  // enables React server components
  },
};

export default nextConfig;
