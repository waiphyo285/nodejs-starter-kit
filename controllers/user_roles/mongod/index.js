const UserRole = require("../../../models/mongodb/models/user_role");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return UserRole
    .find({})
    .then(serialize);
};

const findData = (prop, val) => {
  return UserRole
    .find({
      _id: val
    })
    .then((resp) => {
      return serialize(resp[0]);
    });
};

const findDataBy = (params) => {
  return UserRole
    .find(params)
    .then(serialize);
};

const addData = (dataObj) => {
  return UserRole
    .create(dataObj)
    .then(serialize);
};

const updateData = (id, dataObj) => {
  return UserRole
    .findByIdAndUpdate(id, dataObj)
    .then(serialize);
};

const deleteData = (id) => {
  return UserRole
    .findByIdAndDelete(id)
    .then(serialize);
};

const dropAll = () => {
  return UserRole.remove();
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