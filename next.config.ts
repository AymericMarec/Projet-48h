import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
            {
              protocol: 'http',
              hostname: '192.168.1.186',
              pathname: '/api/uploads/profile-pictures/**',
            },
        ],
    },
};

export default nextConfig;
