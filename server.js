require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const STRAPI_URL = process.env.STRAPI_URL || "https://stylish-one-7f1f35e5b636.herokuapp.com";
console.log(`STRAPI_URL IS: ${STRAPI_URL}`);

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
});
