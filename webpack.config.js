var rupture = require('rupture');
var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ip = require("./util").getIPAddress();

var host = ip || "127.0.0.1";

/*
 * babel参数
 * */
var babelQuery = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
    cacheDirectory: true
};


module.exports = {
    cache: true,
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
            title: 'ReactJS ? I like!',
            minify: {
                removeAttributeQuotes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeTagWhitespace: true
            },
            template: './template.html',
            inject: 'body'
        }),
        //Typically you'd have plenty of other plugins here as well
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "app"),
            manifest: require("./dll/vendor-manifest.json")
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
            test: /\.styl$/,
            exclude: /^node_modules$/,
            include: [
                // 只去解析运行目录下的 app 文件夹
                path.join(__dirname, 'app')
            ],
            loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!stylus-loader'
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
        }, {
            test: /\.less/,
            exclude: /^node_modules$/,
            include: [
                // 只去解析运行目录下的 app 文件夹
                path.join(__dirname, 'app')
            ],
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            include: [
                // 只去解析运行目录下的 app 文件夹
                path.join(__dirname, './app')
            ],
            loader: 'file-loader?name=[name].[ext]'
        }, {
            test: /.scss$/,
            exclude: /node_modules/,
            include: [
                // 只去解析运行目录下的 app 文件夹
                path.join(__dirname, 'app')
            ],
            loaders: ["style", "css", "sass?config=otherSassLoaderConfig"]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            include: [
                // 只去解析运行目录下的 app 文件夹
                path.join(__dirname, 'app')
            ],
            loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            exclude: /^node_modules$/,
            include: [
                // 只去解析运行目录下的 app 文件夹
                path.join(__dirname, 'app')
            ],
            loader: 'url-loader?name=images/[name].[ext]&limit=8192'
        }]
    },
    resolve: {
        root: path.join(__dirname, 'app'),
        extensions: ['', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    stylus: function() {
        return [rupture]
    },
    postcss: function() {
        return [autoprefixer];
    }
};