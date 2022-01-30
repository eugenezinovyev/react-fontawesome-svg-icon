import path, { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: {
            main: './src/index.tsx',
        },
        resolve: {
            extensions: [ '.ts', '.tsx', '.jsx', '...' ],
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    polyfills: {
                        test: /[\\/]node_modules[\\/](@babel|core-js|regenerator-runtime)[\\/]/,
                        name: 'polyfills',
                        chunks: 'initial',
                        priority: 60,
                        enforce: true,
                        reuseExistingChunk: true
                    }
                },
            },
        },
        output: {
            path: path.resolve('./dist'),
            filename: '[name].[contenthash].js',
            clean: true,
            environment: {
                arrowFunction: false,
            },
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
            }),
            argv.analyze && new BundleAnalyzerPlugin(),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/i,
                    resourceQuery: { not: /raw/ },
                    use: [ 'babel-loader', 'ts-loader' ],
                    exclude: [ '/node_modules/' ],
                },
                {
                    test: /\.(jsx)$/i,
                    resourceQuery: { not: /raw/ },
                    use: [ 'babel-loader' ],
                    exclude: [ '/node_modules/' ],
                },
                {
                    test: /\.m?js$/i,
                    resourceQuery: { not: /raw/ },
                    use: 'babel-loader',
                    exclude: /node_modules[\\/](?!(react-router-dom|react-router)[\\/])/,
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
                },
                {
                    resourceQuery: /resource/,
                    type: 'asset/resource',
                }
            ],
        }
    };
};
