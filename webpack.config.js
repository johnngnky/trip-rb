const path = require("path");
const extract = require("mini-css-extract-plugin");
const copy = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/app.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [require("precss"), require("autoprefixer")];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new extract({
            filename: "bundle.css"
        }),
        new copy([{ from: "node_modules/tripetto/fonts/", to: "fonts/" }])
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 8080,
        host: "0.0.0.0"
    }
};
