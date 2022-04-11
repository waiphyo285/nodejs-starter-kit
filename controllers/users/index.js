const {
  listUsers,
  findUser,
  addUser,
  updateWithPass,
  updateWithoutPass,
  deleteUser,
} = require("./mongod/index");

const exportDb = {
  listUsers,
  findUser,
  addUser,
  updateWithPass,
  updateWithoutPass,
  deleteUser,
};

module.exports = exportDb;
