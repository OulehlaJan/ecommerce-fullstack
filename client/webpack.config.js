const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [],
  },
};

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