const utils = require("@helpers/utils");
const serialize = require("./serializer");
const Student = require("@models/mongodb/schemas/student");

const listData = async (params) => {
  const { draw, columns, order, start, length, search, created_at } = params;
  const sort = {};
  const filter = {};
  const w_regx = ["name"];
  const skip = parseInt(start) || 0;
  const limit = parseInt(length) || 10;

  if (created_at) {
    filter.created_at = await utils.getDateRange(created_at);
  }

  if (order) {
    for (const i in order) {
      sort[columns[i].data] = order[i].dir === "asc" ? 1 : -1;
    }
  }

  if (search) {
    for (const i in w_regx) {
      const regx = new RegExp(
        search.value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
        "i"
      );
      w_regx[i] = { [w_regx[i]]: { $regex: regx } };
    }
  }

  return Student.find(filter)
    .or({ $or: w_regx })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .populate({
      path: "townshipid",
      model: "township",
      select: "township_mm township_en",
    })
    .then(async (data) => {
      const recordsTotal = await Student.countDocuments();
      return serialize({
        data,
        draw,
        recordsTotal,
        recordsFiltered: recordsTotal,
      });
    });
};

const findDataById = (id) => {
  return Student.findById(id)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .populate({
      path: "townshipid",
      model: "township",
      select: "township_mm township_en",
    })
    .then(serialize);
};

const findDataBy = (params) => {
  return Student.find(params)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .populate({
      path: "townshipid",
      model: "township",
      select: "township_mm township_en",
    })
    .then(serialize);
};

const addData = (dataObj) => {
  return Student.create(dataObj).then(serialize);
};

const updateData = (id, dataObj) => {
  return Student.findByIdAndUpdate(id, dataObj).then(serialize);
};

const deleteData = (id) => {
  return Student.findByIdAndDelete(id).then(serialize);
};

const dropAll = () => {
  return Student.remove();
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
