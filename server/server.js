const strapi = require("@strapi/strapi");

console.log("Starting Strapi...");

// Ověření načtení environment variables
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

strapi().start();
console.log("Strapi has started.");
