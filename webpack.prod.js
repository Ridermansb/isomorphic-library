const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            comments: false,
            parallel: {
                cache: true,
                workers: 2,
            },
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true,
            },
            mangle: {
                except: ['$', 'webpackJsonp' ],
                screw_ie8: true,
                keep_fnames: true,
            },
            output: {comments: false, screw_ie8: true},
        }),
    ]
});