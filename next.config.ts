import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubBasePath =
  process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: githubBasePath,
  assetPrefix: githubBasePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
