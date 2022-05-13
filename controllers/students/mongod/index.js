const Student = require("../../../models/mongodb/models/student");
const serialize = require("./serializer"); // switch custom

const listData = (params) => {
  const { columns, order, start, length, search } = params;
  const sort = {}; // init empty default
  const w_regx = ["name"]; // add search keys
  const limit = parseInt(length) || undefined;
  const skip = (parseInt(start) || 0) * limit;

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

  return Student.find({})
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
      return serialize({ recordsTotal, recordsFiltered: data.length, data });
    });
};

const findData = (prop, val) => {
  return Student.find({ _id: val })
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
    .then((resp) =>
      serialize(resp[0])
    );
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
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};
