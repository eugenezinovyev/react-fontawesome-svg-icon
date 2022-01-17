const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: {
            main: './src/index.js',
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ],
        },
        output: {
            path: path.resolve('./dist'),
            clean: true,
        },
        devServer: {
            open: true,
            host: 'localhost',
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
            new MiniCssExtractPlugin(),
            new FaviconsWebpackPlugin({
                logo: path.resolve(__dirname, '../../icon.svg'),
                mode: 'webapp',
                devMode: 'webapp',
                prefix: '',
                favicons: {
                    icons: {
                        android: false,
                        appleIcon: false,
                        appleStartup: false,
                        coast: false,
                        favicons: true,
                        firefox: false,
                        windows: false,
                        yandex: false,
                    },
                },
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'public' },
                ],
            })
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/i,
                    resourceQuery: { not: /raw/ },
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                require.resolve('@babel/preset-env'),
                                [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                            ],
                        },
                    },
                    exclude: [ '/node_modules/' ],
                },
                {
                    test: /\.css$/i,
                    exclude: /\.module\.css$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        { loader: 'css-loader', options: { modules: false } }
                    ]
                },
                {
                    test: /\.module\.css$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    exportLocalsConvention: 'camelCase',
                                },
                            }
                        }
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                    type: 'asset',
                },
                {
                    resourceQuery: /raw/,
                    type: 'asset/source',
                }
            ],
        }
    };
};
