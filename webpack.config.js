module.exports = {
  entry: {
    notification: "./src/extension/notification/index.js",
    background: "./src/extension/background/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/build/static/js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
