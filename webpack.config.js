module.exports = {
  entry: './client/src/app.ts',
  output: {
    filename: 'bundle.js',
    path: './build/web-server/client-bundle'
  },
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader" 
      },
      { 
        test: /\.js$/, 
        loader: "source-map-loader",
        enforce: "pre"
      }
    ]
  }
}
