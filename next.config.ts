import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
    images: {
        domains: [ 'unwvmnaejybxmnfulqli.supabase.co' ],
    },
};

export default nextConfig;
