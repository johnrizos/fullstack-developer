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
  options: {
    // Turbopack requires plugin names as strings with serializable options.
    // remark-gfm enables GitHub-Flavored Markdown (tables, strikethrough, etc.).
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [
      // Turbopack requires plugin names as strings with serializable options.
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
          defaultLang: "txt",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
