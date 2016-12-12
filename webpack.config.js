module.exports = {
  entry: './client/src/app.ts',
  output: {
    filename: 'bundle.js',
    path: './build/web-server/client-bundle'
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader" 
      }
    ],
    preLoaders: [
      { 
        test: /\.js$/, 
        loader: "source-map-loader" 
      }
    ]
  }
}
