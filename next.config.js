const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  //output: 'export', // ⭐️ 新增这一行，支持 next export
  webpack: (config) => {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
};

module.exports = nextConfig;
