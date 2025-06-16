import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
    images: {
        domains: [ 'images.pexels.com' ],
    },
};

export default nextConfig;
