/* eslint-disable */
var Webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'src/dist'),
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    plugins: [
                        ['transform-runtime', {                            
                          'polyfill': false,
                          'regenerator': true
                        }],
                        'transform-decorators-legacy'
                    ],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass?indentedSyntax'],
            },
        ],
    },
    resolve: {
        root: [path.join(__dirname, 'src')],
        extensions: ['', '.js', '.jsx', '.sass'],
        modulesDirectories: ['modules', 'node_modules'],
    },
    plugins: [
        // new Webpack.optimize.DedupePlugin(),
        // new Webpack.optimize.OccurenceOrderPlugin(true),
        // new Webpack.optimize.UglifyJsPlugin(),
        new WebpackNotifierPlugin(),
        // new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin(),
    ],
    devtool: 'source-map',
};
