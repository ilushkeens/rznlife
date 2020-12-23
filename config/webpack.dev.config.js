const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config')

const devWebpackConfig = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: webpackConfig.externals.paths.public,
    port: 8081,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
