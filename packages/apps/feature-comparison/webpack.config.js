const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        mode: isProduction ? "production" : "development",
        entry: {
            main: "./src/index.js",
        },
        optimization: {
            minimize: isProduction,
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
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public/index.html") }),
            new MiniCssExtractPlugin(),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/i,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                require.resolve('@babel/preset-env'),
                                [require.resolve('@babel/preset-react'), { runtime: "automatic" }],
                            ],
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
        }
    };
};
