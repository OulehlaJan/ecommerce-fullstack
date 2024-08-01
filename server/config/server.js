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

//  postgres://u4903kfnlko6ov:p213c69a9a229c88b190c4496fb1cf2ddf10447490b5031b26c61b6813d7cf979@cah8ha8ra8h8i7.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/d1m87kj750fddp

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
