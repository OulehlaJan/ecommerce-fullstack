// const { createProxyMiddleware } = require("http-proxy-middleware");
// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 1337;
// const STRAPI_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.MY_HEROKU_URL
//     : "http://localhost:1337";

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

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

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const path = require("path");
const { spawn } = require("child_process");
const app = express();
const PORT = process.env.PORT || 5000;
const STRAPI_PORT = process.env.STRAPI_PORT || 1337;
const STRAPI_URL = `http://localhost:${STRAPI_PORT}`;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Proxy for API
app.use(
  "/api",
  createProxyMiddleware({
    target: STRAPI_URL,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  })
);

// Proxy admin requests to Strapi
app.use(
  "/admin",
  createProxyMiddleware({
    target: STRAPI_URL,
    changeOrigin: true,
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Spuštění Strapi serveru jako samostatného procesu
  const strapiProcess = spawn("npm", ["run", "start:server"], {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "server"),
    shell: true,
  });

  // Handle cleanup when the process is terminated
  process.on("SIGINT", () => {
    strapiProcess.kill("SIGINT");
    process.exit();
  });
});


// ˇ-------------------------------
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const express = require("express");
// const { spawn } = require("child_process");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 3000;
// const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

// // Spuštění Strapi serveru jako samostatného procesu
// const strapiProcess = spawn("npm", ["start"], {
//   stdio: "inherit",
//   cwd: path.resolve(__dirname, "server"),
//   shell: true,
// });

// // Proxy for API
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: STRAPI_URL,
//     changeOrigin: true,
//     pathRewrite: { "^/api": "" },
//     logLevel: "debug",
//   })
// );

// // Proxy admin requests to Strapi
// app.use(
//   "/admin",
//   createProxyMiddleware({
//     target: STRAPI_URL,
//     changeOrigin: true,
//     logLevel: "debug",
//   })
// );

// // // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

// // Handle cleanup when the process is terminated
// process.on("SIGINT", () => {
//   strapiProcess.kill("SIGINT");
//   process.exit();
// });
