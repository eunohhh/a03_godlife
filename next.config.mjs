/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ngtnbcqokvtyrilhkwpz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
