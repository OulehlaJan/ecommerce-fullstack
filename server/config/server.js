const path = require("path");

console.log("Loading server.js...");

module.exports = ({ env }) => {
  const publicPath = path.resolve(__dirname, "../../public");

  // Log the paths to ensure they're correct
  console.log("__dirname in config/server.js:", __dirname);
  console.log("Resolved path to public folder:", publicPath);

  return {
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
      keys: env.array("APP_KEYS"),
    },
    webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
    dirs: {
      public: publicPath,
    },
  };
};

// module.exports = ({ env }) => ({
//   host: env("HOST", "0.0.0.0"),
//   port: env.int("PORT", 1337),
//   app: {
//     keys: env.array("APP_KEYS"),
//   },
//   webhooks: {
//     populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
//   },
// });
