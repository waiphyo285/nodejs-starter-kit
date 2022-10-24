const serialize = require("@controllers/serializer");
const { clearKey } = require("@models/cache/services/index");
const UserRole = require("@models/mongodb/schemas/user_role");

const listData = () => {
  return UserRole
    .find({})
    .cache()
    .then(serialize);
};

const findDataById = (id) => {
  return UserRole
    .findById(id)
    .lean()
    .then((resp) => {
      clearKey(UserRole.collection.collectionName);
      return resp;
    })
    .then(serialize);
};

const findDataBy = (params) => {
  return UserRole
    .find(params)
    .then((resp) => {
      clearKey(UserRole.collection.collectionName);
      return resp;
    })
    .then(serialize);
};

const addData = (dataObj) => {
  return UserRole
    .create(dataObj)
    .then((resp) => {
      clearKey(UserRole.collection.collectionName);
      return resp;
    })
    .then(serialize);
};

const updateData = (id, dataObj) => {
  return UserRole
    .findByIdAndUpdate(id, dataObj)
    .then((resp) => {
      clearKey(UserRole.collection.collectionName);
      return resp;
    })
    .then(serialize);
};

const deleteData = (id) => {
  return UserRole
    .findByIdAndDelete(id)
    .then((resp) => {
      clearKey(UserRole.collection.collectionName);
      return resp;
    })
    .then(serialize);
};

const dropAll = () => {
  return UserRole.remove();
};

module.exports = {
  listData,
  findDataById,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};