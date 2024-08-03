module.exports = ({ env }) => ({
  proxy: true,
  host: "0.0.0.0",
  port: env.int("PORT", 1337),
  url: env("MY_HEROKU_URL"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
});
