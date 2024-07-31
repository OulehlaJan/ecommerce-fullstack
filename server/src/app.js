const path = require("path");
const express = require("express");
const strapi = require("@strapi/strapi");

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../client/build")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

strapi().start();
