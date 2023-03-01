const path = require('path');

const SRC_DIR = path.join(`${__dirname}/client/src`);
const DIST_DIR = path.join(`${__dirname}/client/dist`);

module.exports = {
  mode: "development",
  entry: path.join(`${SRC_DIR}/index.jsx`),
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
