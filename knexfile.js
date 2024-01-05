module.exports = {
    // This is the configuration for your development environment
    development: {
      // This is the database client that knex will use, in this case SQLite3
      client: "sqlite3",
       // This is the connection configuration to connect to your SQLite3 database
      connection: {
        // This is the file where your SQLite3 database is stored
        filename: "./db/dev.sqlite3",
      },
       // By setting useNullAsDefault to true, we're telling SQLite to use NULL values when a value is not available
      useNullAsDefault: true,
       // These are the settings for your database migrations
      migrations: {
        // This is the directory where your migration files are stored
        directory: "./db/migrations",
      },
       // These are the settings for your database seeds
      seeds: {
        // This is the directory where your seed files are stored
        directory: "./db/seeds",
      },
    },
 