const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  public: path.join(__dirname, '../public'),
  assets: 'assets',
  image: 'image'
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    main: PATHS.src
  },
  output: {
    filename: `${ PATHS.assets }/js/[name].js?v=[contenthash:7]`,
    path: PATHS.public,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: { pretty: true }
      }, {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.(jpe?g|png|svg|gif)$/i,
        type: 'asset/resource'
      }, {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: './config/postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }, {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { config: './config/postcss.config.js' } }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${ PATHS.assets }/css/[name].css?v=[contenthash:7]`
    }),
    new HtmlWebpackPlugin({
      filename: './index.html', template: `${ PATHS.src }/view/index.pug`, chunks: ['vendors', 'main'], minify: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        // { from: `${ PATHS.src }/assets/image`, to: PATHS.image },
        { from: `${ PATHS.src }/static`, to: '' }
      ]
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 400000
  }
}
