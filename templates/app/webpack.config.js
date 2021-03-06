const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = (options = {}) => {
    const webpackConfig = {
        entry: {
            app: ['./src/app/init'],
            vendor: [
                'jquery', 'lodash',
                'mo/jqm', 'mo/bouncefix',
                'immutable', 'vow', 'socket.io-client'
            ]
        },
        resolve: {
            extensions: ['.js'],
            modules: [
                'node_modules',
                'templates',
                'styles',
                // Absolute path is for mo to access user modules.
                path.resolve(__dirname, 'src/app'),
                path.resolve(__dirname, 'node_modules')
            ],
            alias: {
                mo: 'mo-framework/modules'
            }
        },
        plugins: [
            new CleanPlugin(['build']),
            new ExtractTextPlugin("[name].css"),
            new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
            new HtmlPlugin({
                template: __dirname + '/src/index.html',
                hash: true,
                inject: 'body'
            })
        ],
        output: {
            path: __dirname + '/build',
            publicPath: '',
            filename: 'app.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'babel-loader'
            }, {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!less-loader'})
            }, {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'url-loader?limit=50000'
            }, {
                test: /\.(eot|ttf|woff|wav|mp3)$/,
                loader: 'file-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            }, {
                test: /jquery.mobile-/,
                loader: 'mo-framework/loaders/context-window'
            }]
        }
    };

    if (options.dev) {
        webpackConfig.devtool = 'source-map';
        webpackConfig.entry.vendor.push(
            'webpack-hot-middleware/client?reload=true'
        );
        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
        webpackConfig.output.pathinfo = true;

    } else if (options.prod) {
        webpackConfig.devtool = false;
        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': 'production'
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    if (options.phonegap) {
        webpackConfig.plugins.push(
            new HtmlIncludeAssetsPlugin({
                assets: ['cordova.js'],
                append: false
            })
        );
    }

    return webpackConfig;
};
