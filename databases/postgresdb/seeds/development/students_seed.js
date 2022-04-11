exports.seed = async function (knex) {
  await knex.raw("DELETE FROM students");
  await knex.raw("ALTER SEQUENCE students_id_seq RESTART WITH 1");
  await knex.raw(`
    INSERT INTO students (id, name, age, grade, prefect) VALUES
    ('622e2747adc20d180c166608', 'howie', 12, 3, TRUE),
    ('622e2747adc20d180c166609', 'felix', 9, 4, FALSE),
    ('622e2747adc20d180c16660a', 'hela', 16, 5, FALSE)
  `);
};

/**
 * to seed, type the following commands
 *
 * npx knex seed:run
 * npx knex seed:make students_seed.js
 *
 */
