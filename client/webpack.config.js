const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Hlavní vstupní bod vaší aplikace
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/", // Důležité pro správné směrování v produkci
  },
  resolve: {
    extensions: [".js", ".jsx"], // Přidání .jsx pro React komponenty
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Přidání podpory pro .jsx soubory
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Přidání @babel/preset-react
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true, // Pro správné směrování v development módu
    static: path.join(__dirname, "public"), // Změněno z contentBase na static
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "[name].[contenthash].js",
//     path: path.resolve(__dirname, "build"),
//     publicPath: "/",
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//     fallback: {
//       path: require.resolve("path-browserify"),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: ["file-loader"],
//       },
//     ],
//   },
//   devServer: {
//     setupMiddlewares: (middlewares, devServer) => {
//       if (!devServer) {
//         throw new Error("webpack-dev-server is not defined");
//       }

//       // Middleware pro logování požadavků
//       middlewares.unshift((req, res, next) => {
//         console.log(`${req.method} ${req.url}`);
//         next();
//       });

//       // Další vlastní middleware kód může být přidán zde
//       middlewares.push((req, res, next) => {
//         // Váš vlastní middleware kód
//         next();
//       });

//       return middlewares;
//     },
//     historyApiFallback: true,
//     static: path.join(__dirname, "public"),
//     compress: true,
//     port: 3000,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//     new BundleAnalyzerPlugin({
//       analyzerMode: "static",
//       openAnalyzer: true,
//     }),
//   ],
//   mode: process.env.NODE_ENV === "production" ? "production" : "development",
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           compress: {
//             drop_console: true,
//           },
//         },
//       }),
//     ],
//     splitChunks: {
//       chunks: "all",
//     },
//     runtimeChunk: "single",
//   },
// };
// -----------------------------------------
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "build"),
//     publicPath: "/",
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//     fallback: {
//       path: require.resolve("path-browserify"),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: ["file-loader"],
//       },
//     ],
//   },
//   devServer: {
//     setupMiddlewares: (middlewares, devServer) => {
//       // Nahrazení `onAfterSetupMiddleware` a `onBeforeSetupMiddleware`
//       if (!devServer) {
//         throw new Error("webpack-dev-server is not defined");
//       }

//       // custom middleware that was in onBeforeSetupMiddleware
//       middlewares.unshift((req, res, next) => {
//         // Your custom code
//         next();
//       });

//       // custom middleware that was in onAfterSetupMiddleware
//       middlewares.push((req, res, next) => {
//         // Your custom code
//         next();
//       });

//       return middlewares;
//     },
//     historyApiFallback: true,
//     static: path.join(__dirname, "public"),
//     compress: true,
//     port: 3000,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//   ],
//   mode: process.env.NODE_ENV === "production" ? "production" : "development",
//   optimization: {
//     splitChunks: {
//       chunks: "all",
//     },
//   },
// };
