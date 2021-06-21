const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: ["node_modules"],
        fallback: {
            fs: false,
            path: require.resolve("path-browserify"),
        },
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CopyPlugin({
            patterns: [
                { from: "node_modules/canvaskit-wasm/bin/canvaskit.wasm" },
            ],
        }),
    ],
    // browser: {
    //     fs: false
    // },
    // resolve: {
    //   fallback: {
    //     fs: false
    //   }
    // }
};
