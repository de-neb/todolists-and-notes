const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: "http://localhost:5000",
  },
};

// {
//   "/api": {
//     target: "http://localhost:5000",
//   },
// },
