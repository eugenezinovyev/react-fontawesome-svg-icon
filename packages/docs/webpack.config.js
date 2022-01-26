import path, { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
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
            extensions: [ '.ts', '.tsx', '...' ],
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
            })
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
                    test: /\.m?js$/i,
                    resourceQuery: { not: /raw/ },
                    use: 'babel-loader',
                    exclude: /node_modules[\\/](?!(react-router-dom|react-router|react-markdown|vfile|vfile-message|unified|trough|remark-parse|mdast-util-from-markdown|mdast-util-to-hast|mdast-util-to-string|mdast-util-gfm-autolink-literal|mdast-util-find-and-replace|mdast-util-gfm-footnote|mdast-util-to-markdown|mdast-util-gfm-table|markdown-table|uvu|dequal|kleur|micromark|micromark-core-commonmark|micromark-extension-gfm-autolink-literal|micromark-extension-gfm-footnote|micromark-extension-gfm-strikethrough|micromark-extension-gfm-table|micromark-extension-gfm-tagfilter|micromark-extension-gfm-task-list-item|debug|remark-gfm|remark-rehype|unist-util-is|property-information)[\\/])/,
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
