const path = require("path");
const express = require("express");
const strapi = require("@strapi/strapi"); // Správný import

const app = express();

// Slouží statické soubory z React frontend aplikace
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// Slouží statické soubory ze složky Strapi public
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Zaznamenává cesty pro ověření, že jsou správné
console.log(`Slouží statické soubory z ${clientBuildPath}`);
console.log(`Slouží statické soubory z ${publicPath}`);

// Vše, co se neshoduje s výše uvedeným, vrací index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Spustí Strapi
strapi()
  .start()
  .then(() => {
    console.log("Strapi server byl úspěšně spuštěn");
  })
  .catch((err) => {
    console.error("Strapi server se nepodařilo spustit", err);
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
