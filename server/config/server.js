// const path = require("path");

// module.exports = ({ env }) => ({
//   proxy: true,
//   host: env("HOST", "0.0.0.0"),
//   port: env.int("PORT", process.env.PORT || 1337),
//   url: env("MY_HEROKU_URL"),
//   app: {
//     keys: env.array("APP_KEYS"),
//   },
//   webhooks: {
//     populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
//   },
//   dirs: {
//     public: path.resolve(__dirname, "../public"),
//   },
//   admin: {
//     auth: {
//       secret: env("ADMIN_JWT_SECRET"),
//     },
//   },
// });

// // ZMĚNA ZA CONFIG Z DOUCMENTATION

const path = require("path");

module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  dirs: {
    public: path.resolve(__dirname, "../../public"),
  },
});ˇ

// ------------------------------------
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
