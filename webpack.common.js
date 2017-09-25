// Follow https://webpack.js.org/guides/production/

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: [ 'babel-polyfill', './src/index.js' ],
    output: {
        path: resolve('dist'),
        library: `[name]`,
        filename: `[name].js`,
        chunkFilename: `[id].[name].js`,
        publicPath: '/',
        sourceMapFilename: `[name].js.map`,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        // used to split out our sepcified vendor script
        // https://brotzky.co/blog/code-splitting-react-router-webpack-2/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'node-static',
            filename: 'node-static.js',
            minChunks(module) {
                const context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'used-twice',
            minChunks(module, count) {
                return count >= 2;
            },
        }),
    ],
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ]
    }
};