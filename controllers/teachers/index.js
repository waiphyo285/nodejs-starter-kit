const {
  listData,
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
} = require("./mysql/index");
// = require('./memory/index')
// = require('./postgres/index')
// switch out db as dev require

const teachersDb = {
  listData,
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};

module.exports = teachersDb;
