const Controller = require("../../../models/mongodb/models/generator");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return Controller.find({}).then(serialize);
};

const findData = (prop, val) => {
  return Controller.find({ _id: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findDataBy = (params) => {
  return Controller.find(params).then(serialize);
};

const addData = (dataObj) => {
  return Controller.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return Controller.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return Controller.findByIdAndDelete(id).then(serialize);
};

const dropAll = () => {
  return Controller.remove();
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
