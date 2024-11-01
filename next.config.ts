import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "publicimage1234.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
