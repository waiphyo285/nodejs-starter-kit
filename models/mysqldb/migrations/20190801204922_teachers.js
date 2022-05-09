exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE teachers (
      id varchar(24) PRIMARY KEY,
      name varchar(100),
      age int,
      grade int,
      prefect boolean DEFAULT false,
      created_at datetime DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE teachers;
  `);
};

/**
 * to migrate, type the following commands
 *
 * npx knex migrate:latest
 *
 */
