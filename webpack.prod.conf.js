var webpack = require('webpack');
var config = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
});

var cssExtractPlugin = new ExtractTextPlugin('webpackstyles.css');

config.devtool = '';
config.output.pathinfo = false;
config.entry = ['./app/App.jsx'];
config.plugins.unshift(productionPlugin);
config.plugins.push(cssExtractPlugin);

config.module.loaders = [{
    test: /\.js$/,
    exclude: /(node_modules)/,
    loaders: ['babel']
}, {
    test: /\.jsx$/,
    exclude: /^node_modules$/,
    loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
}, {
    test: /\.css$/,
    exclude: /^node_modules$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
}, {
    test: /\.less/,
    exclude: /^node_modules$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
}, {
    test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
    exclude: /^node_modules$/,
    loader: 'file-loader?name=[name].[ext]'
}, {
    test: /\.styl$/,
    exclude: /(node_modules)/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus-loader')
}, {
    test: /.scss$/,
    exclude: /node_modules/,
    loaders: ["style", "css", "sass?config=otherSassLoaderConfig"]
}, {
    test: /\.(png|jpg|gif|svg)$/,
    exclude: /(node_modules)/,
    loader: 'url-loader?name=images/[name].[ext]&limit=8192'
}]

module.exports = config;