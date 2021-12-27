/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ],
    },
    experiments: {
        asyncWebAssembly: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".wasm"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        devtoolModuleFilenameTemplate: "../../[resource-path]",
    },
    plugins: [
        new ESLintPlugin({
            extensions: [".ts", ".js"],
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CopyPlugin({
            patterns: [{ from: "assets", to: "assets" }]
        }),
        new WasmPackPlugin({
            crateDirectory: path.join(__dirname, "crate"),
            forceWatch: true,
            forceMode: "development",
            watchDirectories: [path.resolve(__dirname, "crate/src")],
        })
    ],
    devServer: {
        client: {
            reconnect: true,
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        // compress: true,
        port: 3000,
        hot: true,
        devMiddleware: {
            writeToDisk: true,

        },
        static: {
            directory: path.resolve(__dirname, "dist"),
            watch: true,
        },
    },
};
