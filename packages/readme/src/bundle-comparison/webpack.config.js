'use strict';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const configFactory = ({ basePath, outputPath }) => ({
    context: basePath,
    mode: 'production',
    entry: {
        main: [ './index.tsx', '../index.css' ]
    },
    optimization: {
        minimize: true,
        minimizer: [ '...', new CssMinimizerPlugin() ],
    },
    output: {
        path: outputPath,
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: '../index.html' }),
        new MiniCssExtractPlugin(),
        new BundleAnalyzerPlugin({ analyzerMode: 'disabled', openAnalyzer: false, generateStatsFile: true }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: {
                    loader: 'ts-loader',
                    options: {
                        context: basePath,
                        configFile: '../tsconfig.json',
                    },
                },
                exclude: [ '/node_modules/' ],
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
});

export default configFactory;
