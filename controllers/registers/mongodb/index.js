const Register = require("../../../models/mongodb/models/register");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return Register
    .find({})
    .then(serialize);
};

const findDataById = async (id) => {
  return Register
    .findById(id)
    .then(serialize);
};

const findDataBy = (params) => {
  return Register
    .find(params)
    .then(serialize);
};

const addData = (dataObj) => {
  return Register
    .create(dataObj)
    .then(serialize);
};

const updateData = (id, dataObj) => {
  return Register
    .findByIdAndUpdate(id, dataObj)
    .then(serialize);
};

const deleteData = (id) => {
  return Register
    .findByIdAndDelete(id)
    .then(serialize);
};

module.exports = {
  listData,
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
};
