/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
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
        alias: {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",     // Must be below test-utils
            "react/jsx-runtime": "preact/jsx-runtime"
        },
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        devtoolModuleFilenameTemplate: "../../[resource-path]",
    },
    plugins: [
        new ESLintPlugin({
            extensions: [".ts", ".tsx", ".js"],
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["dist"]
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
