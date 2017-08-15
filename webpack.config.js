const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {
  entry: './client/src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build', 'web-server', 'client-bundle')
  },
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader" 
      },
      { 
        test: /\.js$/, 
        loader: "source-map-loader",
        enforce: "pre"
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};
