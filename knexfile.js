const config = require("./config/index");
/**
  In terminal open mysql and create a new database. Then include the name of
  the database and your username and password in the development details below.
  Run the following terminal command
  $ mysql
  ## CREATE DATABASE DB_NAME;
  Note: remember the semicolon syntax
  ## \q
*/
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: config.MYSQL.HOST,
      port: config.MYSQL.PORT,
      user: config.MYSQL.USER,
      password: config.MYSQL.PASS,
      database: config.APP.DATABASE,
    },
    migrations: {
      directory: __dirname + "/models/mysqldb/migrations",
    },
    seeds: {
      directory: __dirname + "/models/mysqldb/seeds/development",
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: config.MYSQL.HOST,
      port: config.MYSQL.PORT,
      user: config.MYSQL.USER,
      password: config.MYSQL.PASS,
      database: config.APP.DATABASE,
      ssl: true,
    },
    migrations: {
      directory: __dirname + "/models/mysqldb/migrations",
    },
    seeds: {
      directory: __dirname + "/models/mysqldb/seeds/production",
    },
  },
};
