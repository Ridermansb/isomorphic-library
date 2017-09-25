// Follow https://webpack.js.org/guides/production/

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: [ 'babel-polyfill', './src/index.js' ],
    output: {
        path: resolve('lib'),
        filename: '[name].js',
        library: 'todos',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        chunkFilename: `[id].[name].js`,
        publicPath: '/',
        sourceMapFilename: `[name].js.map`,
    },
    plugins: [
        new CleanWebpackPlugin(['lib']),
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