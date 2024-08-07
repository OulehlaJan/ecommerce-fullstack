const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));
  const sslConfig = env("DATABASE_SSL") ? JSON.parse(env("DATABASE_SSL")) : false;

  return {
    connection: {
      client: env("DATABASE_CLIENT"),
      connection: {
        host,
        port,
        database,
        user,
        password,
        ssl: sslConfig,
      },
      pool: {
        min: 0,
        max: 5,
      },
      debug: false,
    },
  };
};
