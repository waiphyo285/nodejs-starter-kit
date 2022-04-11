let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
} = require("./mongodb/index");

let exportDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
};

module.exports = exportDb;
