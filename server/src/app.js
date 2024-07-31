const path = require("path");
const express = require("express");
const strapi = require("@strapi/strapi");

const app = express();

// Serve static files from the React frontend app
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// Serve static files from the Strapi public folder
const publicPath = path.join(__dirname, "../server/public");
app.use(express.static(publicPath));

// Log the paths to ensure they're correct
console.log(`Serving static files from ${clientBuildPath}`);
console.log(`Serving static files from ${publicPath}`);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start Strapi
strapi()
  .start()
  .then(() => {
    console.log("Strapi server started successfully");
  })
  .catch((err) => {
    console.error("Strapi server failed to start", err);
  });

// const path = require("path");
// const express = require("express");
// const strapi = require("@strapi/strapi");

// const app = express();

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, "../client/build")));

// // Serve Strapi's public folder
// app.use("/public", express.static(path.join(__dirname, "public")));

// // Anything that doesn't match the above, send back index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

// strapi().start();
