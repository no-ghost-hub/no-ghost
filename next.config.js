// import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["graphql"],
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      use: ["@svgr/webpack"],
    });

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withPayload(nextConfig);
