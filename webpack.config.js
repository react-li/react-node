var rupture = require('rupture');
var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ip = require("./util").getIPAddress();

var host = ip || "127.0.0.1";



module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://' + host + ':3000',
        'webpack/hot/only-dev-server',
        './app/App.jsx'
    ],
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '!',
            minify: {
                removeTagWhitespace: true,
                removeAttributeQuotes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            },
            template: './template.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['react-hot', 'babel']
        }, {
            test: /\.styl$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!stylus-loader'
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
            test: /.scss$/,
            exclude: /node_modules/,
            loaders: ["style", "css", "sass?config=otherSassLoaderConfig"]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'url-loader?name=images/[name].[ext]&limit=8192'
        }]
    },
    resolve: {
        root: path.join(__dirname, '..', 'app'),
        extensions: ['', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    stylus: function() {
        return [rupture]
    },
    postcss: function() {
        return [autoprefixer];
    }
};