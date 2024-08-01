const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATBASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnathorized: false,
      },
    },
    debug: false,
  },
});
