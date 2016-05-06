const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    app: [
      path.join(__dirname, 'src/main.js'),
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      //   loader: 'url-loader?limit=10000&name=assets/[hash].[ext]'
      // },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=60000&name=assets/[hash].[ext]'
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      }
    ]
  },
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    extentions: ['', '.js', '.json', '.css', '.scss', '.sass'],
    alias: {
      src: path.join(__dirname, 'src'),
      backbone: path.join(__dirname, 'node_modules', 'backbone', 'backbone')
    }
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.NoErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'JM',
      template: './src/index.html',
      mobile: true,
      inject: false
    })
  ]
};
