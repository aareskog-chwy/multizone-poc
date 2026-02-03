/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/app2',
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
    }
};

export default nextConfig;
