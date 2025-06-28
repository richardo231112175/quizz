import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
    images: {
        domains: [ 'img.clerk.com', 'unwvmnaejybxmnfulqli.supabase.co', 'images.pexels.com' ],
    },
    reactStrictMode: true,
};

export default nextConfig;
