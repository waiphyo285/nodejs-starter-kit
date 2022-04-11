const config = require("../../config");

const environment = config.NODE_ENV || "development";
const knexConfig = require("../../knexfile")[environment];
const connection = require("knex")(knexConfig);

// CREATE DATABASE db_name CHARACTER SET latin1 COLLATE latin1_swedish_ci;

module.exports = connection;
