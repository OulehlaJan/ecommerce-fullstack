console.log("Starting to load config/database.js...");

const path = require("path");

console.log("Loading config/database.js...");

module.exports = ({ env }) => {
  try {
    const client = env("DATABASE_CLIENT", "postgres");

    console.log("DATABASE_CLIENT:", env("DATABASE_CLIENT"));
    console.log("DATABASE_URL:", env("DATABASE_URL"));
    console.log("DATABASE_SSL:", env("DATABASE_SSL"));
    console.log("DATABASE_POOL_MIN:", env.int("DATABASE_POOL_MIN", 2));
    console.log("DATABASE_POOL_MAX:", env.int("DATABASE_POOL_MAX", 10));

    const connections = {
      postgres: {
        connection: {
          connectionString: env("DATABASE_URL"),
          ssl: env.bool("DATABASE_SSL", true)
            ? { rejectUnauthorized: false }
            : false,
        },
        pool: {
          min: env.int("DATABASE_POOL_MIN", 2),
          max: env.int("DATABASE_POOL_MAX", 10),
        },
      },
      sqlite: {
        connection: {
          filename: path.join(
            __dirname,
            "..",
            env("DATABASE_FILENAME", ".tmp/data.db")
          ),
        },
        useNullAsDefault: true,
      },
    };

    console.log(`Using database client: ${client}`);
    console.log("Postgres connection:", connections.postgres);

    return {
      connection: {
        client,
        ...connections[client],
        acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
      },
    };
  } catch (error) {
    console.error("Error loading database configuration:", error);
    throw error;
  }
};
