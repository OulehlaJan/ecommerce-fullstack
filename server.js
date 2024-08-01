const strapi = require("@strapi/strapi");
const path = require("path");
const express = require("express");

const app = express();

// Serve static files from the React frontend app
const clientBuildPath = path.join(__dirname, "client/build");
app.use(express.static(clientBuildPath));

// Serve static files from the Strapi public folder
const publicPath = path.join(__dirname, "server/public");
app.use(express.static(publicPath));

// Log the paths to ensure they're correct
console.log(`Serving static files from ${clientBuildPath}`);
console.log(`Serving static files from ${publicPath}`);

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
