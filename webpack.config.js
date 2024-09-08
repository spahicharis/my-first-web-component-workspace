const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    "my-first-web-component-lib.js": [
      path.resolve(__dirname, "dist/my-first-web-component-builder/browser/polyfills.js"),
      path.resolve(__dirname, "dist/my-first-web-component-builder/browser/styles.css"),
      path.resolve(__dirname, "dist/my-first-web-component-builder/browser/main.js"),
    ],
  },
  output: { filename: "[name]", path: path.resolve(__dirname, "dist/web-component-result") },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
