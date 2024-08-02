const express = require("express");
const path = require("path");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// // Proxy for API
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: STRAPI_URL,
//     changeOrigin: true,
//     pathRewrite: { "^/api": "" },
//   })
// );

// // Proxy admin requests to Strapi
// app.use(
//   "/admin",
//   createProxyMiddleware({
//     target: STRAPI_URL,
//     changeOrigin: true,
//   })
// );

// // Proxy for API
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:1337",
//     changeOrigin: true,
//   })
// );

// // Proxy admin requests to Strapi
// app.use(
//   "/admin",
//   createProxyMiddleware({
//     target: "http://localhost:1337",
//     changeOrigin: true,
//   })
// );

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ------------------------------
// const strapi = require("@strapi/strapi");
// const path = require("path");
// const express = require("express");

// const app = express();

// // Serve static files from the React frontend app
// const clientBuildPath = path.join(__dirname, "client/build");
// app.use(express.static(clientBuildPath));

// // Serve static files from the Strapi public folder
// const publicPath = path.join(__dirname, "public"); // Updated path
// app.use(express.static(publicPath));

// console.log(`Serving static files from ${clientBuildPath}`);
// console.log(`Serving static files from ${publicPath}`);

// // Additional logging for debugging
// console.log("__dirname:", __dirname);
// console.log("clientBuildPath:", clientBuildPath);
// console.log("publicPath:", publicPath);

// // Anything that doesn't match the above, send back index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(clientBuildPath, "index.html"));
// });

// // Start Strapi
// strapi({
//   dir: path.resolve(__dirname, "server"),
//   appPath: path.resolve(__dirname, "server"),
//   staticPaths: {
//     public: path.resolve(__dirname, "public"), // Updated path
//   },
// })
//   .start()
//   .then(() => {
//     console.log("Strapi server started successfully");
//   })
//   .catch((err) => {
//     console.error("Strapi server failed to start", err);
//   });
