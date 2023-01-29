/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB || "music_diary",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.PASSWORD || null,
      port: process.env.POSTGRES_PORT || 5432,
      charset: "utf8",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: { directory: "./db/seeds" },
  },
};
// }
// client: "pg",
//     connection: {
//       user: process.env.POSTGRES_USER ||"postgres",
//       database: process.env.POSTGRES_DB||"music_diary",
//       password: process.env.PASSWORD,
//     },
//     migrations: {
//       directory: "./db/migrations",
//     },
//     seeds: { directory: "./db/seeds" },
// },
// client: "pg",
//   connection:process.env.DATABASE_URL,
//   ssl: {
//         rejectUnauthorized: false,
//       },
//       migrations: {
//         directory: "./db/migrations",
//       },
//       seeds: { directory: "./db/seeds" },

// }
