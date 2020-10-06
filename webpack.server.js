const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    entry: './server/index.js',
    target: 'node',
    // devtool: 'source-map',
    mode: "development",
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                resolve: {
                    extensions: [".js", ".jsx"]
                }
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            esModule: true
                        },
                    },
                    { loader: 'css-loader' }
                ],
            }, {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            limit: 8192,
                        },
                    },
                ],
            }
        ]
    },
    output: {
        path: path.resolve('server-build'),
        filename: 'index.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: false
        }),
        new FileManagerPlugin({
            onEnd: {
                move: [{
                    source: 'build/index.html',
                    destination: 'server-build/index.html'
                }]
            }
        })
    ]
}