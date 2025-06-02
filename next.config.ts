import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
            {
              protocol: 'http',
              hostname: '10.33.70.223',
              pathname: '/api/uploads/profile-pictures/**',
            },
        ],
    },
};

export default nextConfig;
