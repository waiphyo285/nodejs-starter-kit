const config = require("../../../config/index");

const DB_NAME = config.APP.DATABASE;

exports.up = function (knex) {
  return knex.raw(
    `CREATE DATABASE ${DB_NAME} CHARACTER SET utf8 COLLATE utf8_general_ci;`
  );
};

exports.down = function (knex) {
  return knex.raw(`DROP DATABASE ${DB_NAME}`);
};

/**
 * to migrate, type the following commands
 *
 * npx knex migrate:latest
 *
 */
