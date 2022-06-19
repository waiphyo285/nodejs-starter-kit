const Register = require("../../../models/mongodb/models/register");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return Register
    .find({})
    .then(serialize);
};

const findData = async (prop, val) => {
  return Register
    .find({ _id: val })
    .then((resp) => {
      return serialize(resp[0]);
    });
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
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
};
