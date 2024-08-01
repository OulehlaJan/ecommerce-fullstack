const strapi = require("@strapi/strapi");
const path = require("path");
const express = require("express");

const app = express();

// Serve static files from the React frontend app build folder
const clientBuildPath = path.join(__dirname, "client/build");
app.use(express.static(clientBuildPath));

// Serve static files from the new public folder
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

console.log("__dirname:", __dirname);
console.log("clientBuildPath:", clientBuildPath);
console.log("publicPath:", publicPath);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start Strapi
strapi({
  dir: path.resolve(__dirname, "server"),
  appPath: path.resolve(__dirname, "server"),
  staticPaths: {
    public: publicPath, // Use the new public path
  },
})
  .start()
  .then(() => {
    console.log("Strapi server started successfully");
  })
  .catch((err) => {
    console.error("Strapi server failed to start", err);
  });
