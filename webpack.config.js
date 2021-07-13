const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.wasm$/,
                type: "webassembly/experimental",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".wasm"],
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        devtoolModuleFilenameTemplate: "../../[resource-path]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CopyPlugin([{ from: "assets", to: "assets" }]),
        new WasmPackPlugin({
            crateDirectory: path.join(__dirname, "crate"),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000,
        hot: true,
        writeToDisk: true,
    },
};
