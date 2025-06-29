const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = (_, argv) => {
  const isProd = argv.mode === "production";
  const plugins = [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: isProd
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
    }),
  ];

  const minimizer = [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
  ];

  if (isProd) {
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    minimizer.push(new CssMinimizerPlugin());
  }

  return {
    entry: {
      main: "./src/index.tsx",
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].js",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    devtool: isProd ? false : "eval-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      port: 5173,
      host: "0.0.0.0",
      hot: true,
      open: false,
      watchFiles: {
        paths: ["src/**/*"],
        options: {
          usePolling: true,
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: { progressive: true },
                optipng: { enabled: true },
                pngquant: { quality: [0.65, 0.90], speed: 4 },
                gifsicle: { interlaced: false },
                webp: { quality: 75 }
              }
            }
          ]
        },
      ],
    },
    optimization: {
      minimize: isProd,
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 50000,
        minChunks: 1,
        automaticNameDelimiter: "-",
        enforceSizeThreshold: 50000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: "single",
      minimizer,
    },
    plugins,
  };
};
