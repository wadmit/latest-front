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
  
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.wiseadmit.io",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.dev.wiseadmit.io",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
