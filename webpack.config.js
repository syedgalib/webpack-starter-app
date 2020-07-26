const path                 = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackRTLPlugin     = require("webpack-rtl-plugin");

module.exports = {
  mode: "development", // production | development
  // watch: true,
  entry: {
    main: "./assets/src/js/index.js",
    vendor: "./assets/src/js/vendor.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets/dist/js"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/app.css",
    }),
    new WebpackRTLPlugin({
      minify: false,
    }),
  ],
  module: {
    rules: [
      // Loading Images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "../images",
            },
          },
        ],
      },
      // Loading Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "../fonts",
          },
        },
      },
      // Loading JS
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Loading SASS
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
