import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secret-room.sirv.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
