module.exports = {
  entry: {
    notification: "./src/notification/index.js",
    background: "./src/background.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/build",
  },
};
