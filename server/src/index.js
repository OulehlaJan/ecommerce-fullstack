const path = require("path");
const express = require("express");
const strapi = require("@strapi/strapi"); // Import Strapi správně

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../client/build")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

strapi().start(); // Spusťte Strapi správně

// 'use strict';

// module.exports = {
//   /**
//    * An asynchronous register function that runs before
//    * your application is initialized.
//    *
//    * This gives you an opportunity to extend code.
//    */
//   register(/*{ strapi }*/) {},

//   /**
//    * An asynchronous bootstrap function that runs before
//    * your application gets started.
//    *
//    * This gives you an opportunity to set up your data model,
//    * run jobs, or perform some special logic.
//    */
//   bootstrap(/*{ strapi }*/) {},
// };
