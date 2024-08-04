const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  optimization: {
    splitChunks: {
      chunks: "all", // Rozdělení kódu na menší části, což může pomoci s pamětí a zlepšit výkon
    },
  },
};

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js", // Hlavní vstupní bod vaší aplikace
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "build"),
//     publicPath: "/", // Důležité pro správné směrování v produkci
//   },
//   resolve: {
//     extensions: [".js", ".jsx"], // Přidání .jsx pro React komponenty
//     fallback: {
//       path: require.resolve("path-browserify"),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, // Přidání podpory pro .jsx soubory
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"], // Přidání @babel/preset-react
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
//     historyApiFallback: true, // Pro správné směrování v development módu
//     static: path.join(__dirname, "public"), // Změněno z contentBase na static
//     compress: true,
//     port: 3000,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//   ],
//   mode: process.env.NODE_ENV === "production" ? "production" : "development",
// };
