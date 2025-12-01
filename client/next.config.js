/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "themazine.com",
                pathname: "/html/mora-blog/images/**",
            },
        ],
    },
};

export default nextConfig;
