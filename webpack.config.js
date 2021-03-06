const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './app/app.scss', './app/app.js'],
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    {loader: 'extract-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer()
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer Dart Sass
                            implementation: require('sass'),

                            // See https://github.com/webpack-contrib/sass-loader/issues/804
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['./node_modules'],
                            },
                        },
                    }
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            { test: /\.jsx?$/, loader: 'babel-loader' },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 25000,
                        name: '[path][name].[ext]',
                        context: path.resolve(__dirname, "img/"),
                        outputPath: 'dist/',
                        publicPath: '../',
                        useRelativePaths: true
                    }
                }
            }
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'img'),
            "node_modules"
        ],
    },
};
