import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: '',
                pathname: '/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                port: '',
                pathname: '/736x/8d/ca/11/8dca11e2f18ddedc934f95cc307ebf8d.jpg',
                search: '',
            },
        ],
    },
};

export default nextConfig;
