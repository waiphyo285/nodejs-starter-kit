
const utils = require("@helpers/utils");
const serialize = require("./serializer");
const User = require("@models/mongodb/schemas/user");

const listUsers = async (params) => {
  if (params.created_at) {
    params.created_at = await utils.getDateRange(
      params.created_at
    )
  }

  return User
    .find(params)
    .populate({
      path: "levelid",
      model: "user_role",
      select: "level",
    })
    .lean()
    .then(serialize);
};

const findUserById = (id) => {
  return User
    .findById(id)
    .lean()
    .then(serialize);
};

const addUser = (dataObj) => {
  const user = new User(dataObj);
  return user.save()
    .then(serialize);
};

const updateWithPass = (id, dataObj) => {
  return User
    .findOneAndUpdate(
      { _id: id }, dataObj, { new: true }
    )
    .lean()
    .then(serialize);
};

const updateWithoutPass = async (id, dataObj) => {
  return User
    .findByIdAndUpdate(
      id, dataObj, { new: true }
    )
    .lean()
    .then(serialize);
};

const deleteUser = (id) => {
  return User
    .findByIdAndDelete(id)
    .lean()
    .then(serialize);
};

module.exports = {
  listUsers,
  findUserById,
  addUser,
  updateWithPass,
  updateWithoutPass,
  deleteUser,
};
