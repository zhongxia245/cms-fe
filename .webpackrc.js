const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    filename: '[name].[hash:8].js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
      disable: false,
      allChunks: true
    })
  ]
}
