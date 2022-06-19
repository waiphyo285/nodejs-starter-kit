const City = require("../../../models/mongodb/models/city");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return City
    .find({})
    .then(serialize);
};

const findData = (prop, val) => {
  return City
    .findOne({ _id: val })
    .then(serialize);
};

const findDataBy = (params) => {
  return City
    .find(params)
    .then(serialize);
};

const addData = (dataObj) => {
  return City
    .create(dataObj)
    .then(serialize);
};

const updateData = (id, dataObj) => {
  return City
    .findByIdAndUpdate(id, dataObj)
    .then(serialize);
};

const deleteData = (id) => {
  return City
    .findByIdAndDelete(id)
    .then(serialize);
};

const dropAll = () => {
  return City
    .remove();
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};
