const Township = require("../../../models/mongodb/models/township");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return Township
    .find({})
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

const findDataById = async (id) => {
  return Township
    .findById(id)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

const findDataBy = (params) => {
  return Township
    .find(params)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

const addData = (dataObj) => {
  return Township
    .create(dataObj)
    .then(serialize);
};

const updateData = (id, dataObj) => {
  return Township
    .findByIdAndUpdate(id, dataObj)
    .then(serialize);
};

const deleteData = (id) => {
  return Township
    .findByIdAndDelete(id)
    .then(serialize);
};

const dropAll = () => {
  return Township.remove();
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
