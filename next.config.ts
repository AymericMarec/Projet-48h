import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
            {
              protocol: 'http',
<<<<<<< HEAD
              hostname: '192.168.1.186',
=======
              hostname: 'localhost',
>>>>>>> 0a05c79 (findPath and SearchStations completed)
              pathname: '/api/uploads/profile-pictures/**',
            },
        ],
    },
};

export default nextConfig;
