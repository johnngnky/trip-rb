const webpack = require("webpack");
const path = require("path");
const package = require("./package.json");

module.exports = {
    entry: "./src/app.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/static"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        mainFields: ["browser", "main"]
    },
    devServer: {
        contentBase: path.join(__dirname, "static"),
        port: 9000,
        host: "0.0.0.0"
    }
};
