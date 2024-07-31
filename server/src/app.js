const path = require("path");
const express = require("express");
const strapi = require("@strapi/strapi");

const app = express();

// Serve static files from the React frontend app
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// Log the path to ensure it's correct
console.log(`Serving static files from ${clientBuildPath}`);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

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
