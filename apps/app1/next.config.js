/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
    }
};

if (process.env.NODE_ENV === 'production') {
    nextConfig.rewrites = async () => {
        return [
            {
                source: '/app2/:path*',
                destination: `${process.env.NEXT_PUBLIC_APP2_URL}/app2/:path*`,
            },
        ];
    };
}

export default nextConfig;
