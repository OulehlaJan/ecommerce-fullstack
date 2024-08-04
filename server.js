const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start Strapi
exec(
  "npm run start:server",
  { cwd: path.join(__dirname, "server") },
  (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting Strapi: ${stderr}`);
    } else {
      console.log(`Strapi started: ${stdout}`);
    }
  }
);

// Start Nginx
exec(
  "nginx -c " + path.join(__dirname, "nginx/nginx.conf"),
  (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting Nginx: ${stderr}`);
    } else {
      console.log(`Nginx started: ${stdout}`);
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const { createProxyMiddleware } = require("http-proxy-middleware");
// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 5000;
// const STRAPI_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.MY_HEROKU_URL
//     : "http://localhost:1337";

// // // Serve static files from the React app
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
//   console.log(`Server is running on port ${PORT}`);
// });
