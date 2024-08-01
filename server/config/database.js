const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

  return {
    connection: {
      client: "postgres",
      connection: {
        host,
        port,
        database,
        user,
        password,
        ssl: { rejectUnauthorized: false },
      },
      debug: false,
    },
  };
};

// ZMĚNA ZA CONFIG Z DOUCMENTATION

// const parse = require("pg-connection-string").parse;
// const config = parse(process.env.DATABASE_URL);

// console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
// console.log("Parsed config:", config);

// module.exports = ({ env }) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       host: config.host,
//       port: config.port,
//       database: config.database,
//       user: config.user,
//       password: config.password,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     },
//     pool: {
//       min: env.int("DATABASE_POOL_MIN", 2),
//       max: env.int("DATABASE_POOL_MAX", 10),
//     },
//     acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
//   },
// });
