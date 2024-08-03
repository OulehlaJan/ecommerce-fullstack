require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const STRAPI_URL = process.env.MY_HEROKU_URL;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

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
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
