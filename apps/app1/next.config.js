/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/app2/:path*',
                destination: 'http://localhost:3001/app2/:path*',
            },
        ];
    },
};

export default nextConfig;
