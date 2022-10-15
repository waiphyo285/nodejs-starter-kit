const User = require("../../../models/mongodb/models/user");
const serialize = require("./serializer");

const listUsers = () => {
  return User
    .find({})
    .populate({
      path: "levelid",
      model: "user_role",
      select: "level",
    })
    .lean()
    .then(serialize);
};

const findUser = (id) => {
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
  findUser,
  addUser,
  updateWithPass,
  updateWithoutPass,
  deleteUser,
};
