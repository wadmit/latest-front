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
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          // options: {
          // },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
