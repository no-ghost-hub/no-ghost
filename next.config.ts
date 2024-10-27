import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { Config as SVGRConfig } from "@svgr/core";

const nextConfig: NextConfig = {
  serverExternalPackages: ["graphql"],
  webpack: (config) => {
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
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foodics-console-sandbox.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
