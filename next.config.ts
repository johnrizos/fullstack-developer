import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/fullstack-developer" : undefined,
  assetPrefix: isGitHubPages ? "/fullstack-developer/" : undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
