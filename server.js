const strapi = require("@strapi/strapi");
const path = require("path");
const express = require("express");

const app = express();

// Serve static files from the React frontend app
const clientBuildPath = path.join(__dirname, "client/build");
app.use(express.static(clientBuildPath));

// Additional logging for debugging
console.log("__dirname:", __dirname);
console.log("clientBuildPath:", clientBuildPath);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start Strapi
strapi({
  dir: path.resolve(__dirname, "server"),
  appPath: path.resolve(__dirname, "server"),
  staticPaths: {
    public: path.resolve(__dirname, "server/public"),
  },
})
  .start()
  .then(() => {
    console.log("Strapi server started successfully");
  })
  .catch((err) => {
    console.error("Strapi server failed to start", err);
  });
