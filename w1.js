var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/)
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: [
            './app/App.jsx',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
        ]
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: '/js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel?' + JSON.stringify({
                presets: ['react', 'es2015', 'stage-0']
            })],
            exclude: /node_modules/
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
            test: /\.scss$/,
            loaders: ['style', 'css', 'autoprefixer', 'sass']
        }]
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
        ignore,
        new ExtractTextPlugin('[name].css'),
    ],
    resolve: {
        root: path.join(__dirname, 'app'),
        extensions: ['', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    devServer: {
        host: '0.0.0.0'

    }
};