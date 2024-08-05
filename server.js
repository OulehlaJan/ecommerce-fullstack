const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const cors = require("cors");
const { spawn } = require("child_process"); // Přidání tohoto řádku
const app = express();
const PORT = process.env.PORT || 5000;
const STRAPI_PORT = process.env.STRAPI_PORT || 1337; // Strapi bude běžet na tomto portu
const STRAPI_URL = `http://localhost:${STRAPI_PORT}`; // Interní URL pro Strapi

// Nastavení CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://stylish-one-7f1f35e5b636.herokuapp.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Proxy for API
app.use(
  "/api",
  createProxyMiddleware({
    target: STRAPI_URL,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    logLevel: "debug",
  })
);

// Proxy admin requests to Strapi
app.use(
  "/admin",
  createProxyMiddleware({
    target: STRAPI_URL,
    changeOrigin: true,
    logLevel: "debug",
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

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

// const { createProxyMiddleware } = require("http-proxy-middleware");
// const express = require("express");
// const { spawn } = require("child_process");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 5000;
// const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

// // Přidání vlastních CORS hlaviček
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

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
//     onProxyRes: function (proxyRes, req, res) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//       );
//       res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     },
//   })
// );

// // Proxy admin requests to Strapi
// app.use(
//   "/admin",
//   createProxyMiddleware({
//     target: STRAPI_URL,
//     changeOrigin: true,
//     logLevel: "debug",
//     onProxyRes: function (proxyRes, req, res) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//       );
//       res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     },
//   })
// );

// // Serve static files from the React app
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
