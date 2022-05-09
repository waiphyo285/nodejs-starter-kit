const knex = require("../../../models/postgresdb/connection");

const listData = () => {
  return knex.raw(`SELECT * FROM students;`).then((data) => data.rows);
};

const findData = (prop, val) => {
  return knex
    .raw(`SELECT * FROM students WHERE ${prop}= '${val}'`)
    .then((data) => data.rows[0]);
};

const findDataBy = (prop, val) => {
  return knex
    .raw(`SELECT * FROM students WHERE ${prop}= '${val}'`)
    .then((data) => data.rows);
};

const addData = (dataObj) => {
  return knex("students")
    .insert(dataObj)
    .returning("*")
    .then((result) => result[0]);
};

const deleteData = (id) => {
  return knex("students")
    .where("id", id)
    .del()
    .then((resp) => {
      if (data === 1) {
        return { id: id };
      }
      return null;
    });
};

const dropAll = () => {
  return knex.raw(`
    DELETE FROM students;
    ALTER SEQUENCE students_id_seq RESTART WITH 1;
  `);
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  deleteData,
  dropAll,
};
