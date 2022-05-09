const config = require("../../config");
const clr = require("../../helpers/handle_color_logs");

const environment = config.NODE_ENV || "development";
const knexConfig = require("../../knexfile")[environment];
const connection = require("knex")(knexConfig);

connection
  .raw("SELECT 1")
  .then(() => {
    console.log(`${clr.fg.magenta}Database: 😃 MySQL is connected!`);
  })
  .catch((error) => {
    console.log(`${clr.fg.red}Database: 😡 MySQL connection error`, error);
  });

// CREATE DATABASE db_name CHARACTER SET latin1 COLLATE latin1_swedish_ci;

module.exports = connection;
