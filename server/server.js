const strapi = require("strapi");
const path = require("path");
const express = require("express");

strapi().start(() => {
  const app = strapi.app;

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Catch-all to send back React's index.html for any other routes
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/admin")) {
      next();
    } else {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    }
  });
});

// const strapi = require("@strapi/strapi");
// strapi().start();
