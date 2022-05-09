const config = require("../../config");

const environment = config.NODE_ENV || "development";
const knexConfig = require("../../knexfile")[environment];
const connection = require("knex")(knexConfig);

module.exports = connection;
