const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './example/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        loader: 'file-loader',
        test: /\.(jpg|jpeg|png|gif)/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    })
  ],
  devServer: {
    port: 8000,
    open: false
  }
}
