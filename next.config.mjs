/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
    },
};

export default nextConfig;
