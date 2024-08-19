/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d30wxqb3mmk4o.cloudfront.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dpf0lffknxpow.cloudfront.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
