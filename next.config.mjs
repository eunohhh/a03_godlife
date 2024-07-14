/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ngtnbcqokvtyrilhkwpz.supabase.co",
            },
            {
                protocol: "http",
                hostname: "openweathermap.org",
                pathname: "/img/wn/**@2x.png",
            },
            {
                protocol: "http",
                hostname: "k.kakaocdn.net",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
        ],
        // minimumCacheTTL: 1,
    },
    // compress: false,
    // webpack(webpackConfig) {
    //     return {
    //         ...webpackConfig,
    //         optimization: {
    //             minimize: false,
    //         },
    //     };
    // },
    // experimental: { forceSwcTransforms: true },
};

export default nextConfig;
