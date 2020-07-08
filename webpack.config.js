const path = require("path");

module.exports = {
  entry: {
    notification: "./src/extension/notification/index.ts",
    background: "./src/extension/background/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build/static/js"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.extension.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
