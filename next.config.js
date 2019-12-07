const path = require("path");
const webpack = require("webpack");
const rehypePrism = require("@mapbox/rehype-prism");
const nextMDX = require("@next/mdx");
const rehypeReadme = require("./lib/rehype-readme");

// only enable rehypeReadme for this file
// because the github relative path replacement
// might break things in other markdowns
const withGitHubMDX = nextMDX({
  extension: path.join(__dirname, "components", "docs", "docs.mdx"),
  options: {
    hastPlugins: [
      rehypePrism,
      [
        rehypeReadme,
        {
          repo: "zeit/next.js",
          branch: "master",
          level: 4
        }
      ]
    ]
  }
});

const withContributionMDX = nextMDX({
  extension: path.join(
    __dirname,
    "components",
    "contributions",
    "contributions.mdx"
  )
});

const withMDX = nextMDX({
  extension: /\/(pages)\/(.+)\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism]
  }
});

const config = {
  pageExtensions: ["jsx", "js", "mdx"],
  webpack: (config, { dev, isServer }) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /highlight\.js[\/\\]lib[\/\\]languages$/,
        new RegExp(`^./(${["javascript", "json", "xml"].join("|")})$`)
      )
    );

    return config;
  }
};

module.exports = withContributionMDX(withGitHubMDX(withMDX(config)));
