const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var paths = require('./paths');

module.exports = {
    entry: './src/index.js',
    output: {
      path: paths.appBuild,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(css|less)$/,
                // use:["style-loader", "css-loader", "less-loader"]
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader!less-loader",
                })
            },
            {
                test: /\.svg$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ 
            template: './public/index.html', 
            filename: './index.html' 
        }),
        new ExtractTextPlugin('style.css')
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.less']
    },
    devServer: {
      contentBase: './public',
      hot: true
    }
  };