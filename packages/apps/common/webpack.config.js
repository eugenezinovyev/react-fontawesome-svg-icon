const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const titleCase = input => input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        mode: isProduction ? "production" : "development",
        entry: {
            main: ["./index.tsx", path.resolve(__dirname, "index.css")]
        },
        optimization: {
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
            ],
        },
        output: {
            path: path.resolve("./dist"),
            clean: true,
        },
        devServer: {
            open: true,
            host: "localhost",
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html"), title: titleCase(argv.name) }),
            new MiniCssExtractPlugin(),
            new BundleAnalyzerPlugin({ analyzerMode: "static", openAnalyzer: false, generateStatsFile: true }),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/i,
                    use: {
                        loader: "ts-loader",
                        options: {
                            context: path.resolve('./'),
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                    exclude: [ "/node_modules/" ],
                },
                {
                    test: /\.css$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                    type: "asset",
                },
            ],
        },
        resolve: {
            extensions: [ ".tsx", ".ts", ".js" ],
        },
    };
};
