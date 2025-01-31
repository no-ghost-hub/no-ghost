import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { Config as SVGRConfig } from "@svgr/core";

const nextConfig: NextConfig = {
  experimental:
    process.env.NODE_ENV === "development"
      ? {
          turbo: {
            rules: {
              "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
              },
            },
          },
        }
      : {},
  webpack:
    process.env.NODE_ENV === "production"
      ? (config) => {
          const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.(".svg"),
          );

          config.module.rules.push({
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  typescript: true,
                  svgoConfig: {
                    plugins: [],
                  },
                } as SVGRConfig,
              },
            ],
          });

          fileLoaderRule.exclude = /\.svg$/i;

          return config;
        }
      : (config) => config,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foodics-console-sandbox.s3.eu-west-1.amazonaws.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          { type: "host", value: process.env.NEXT_PUBLIC_RESERVE_HOST || "" },
        ],
        permanent: true,
        destination: "/:path*?navigation=reserve",
      },
    ];
  },
};

export default withPayload(nextConfig);
