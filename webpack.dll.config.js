/**
 * Doc https://segmentfault.com/a/1190000005770042
 */

const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dll'),
        filename: '[name].dll.js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。 
             */
            name: '[name]_library'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        root: path.resolve(__dirname, "app"),
        modulesDirectories: ["node_modules"]
    }
};