const {
  listData,
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
} = require("./mongod/index");
// = require('./memory/index')
// = require('./postgres/index')
// switch out db as dev require

const exportDb = {
  listData,
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};

module.exports = exportDb;
