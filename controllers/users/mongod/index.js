const { clearKey } = require("../../../databases/cache/services/index");
const User = require("../../../databases/mongodb/models/user");
const serialize = require("../../serializer"); // switch custom

const listUsers = () => {
  return User.find({}).cache().then(serialize);
};

const findUser = (prop, val) => {
  if (prop === "id") prop = "_id";
  return User.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const addUser = (dataObj) => {
  const user = new User(dataObj);
  return user
    .save()
    .then((resp) => {
      clearKey(User.collection.collectionName);
      return resp;
    })
    .then(serialize);
};

const updateWithPass = (id, dataObj) => {
  return User.findOneAndUpdate({ _id: id }, dataObj, { new: true }).then(
    serialize
  );
};

const updateWithoutPass = async (id, dataObj) => {
  return User.findByIdAndUpdate(id, dataObj, { new: true }).then(serialize);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id).then(serialize);
};

module.exports = {
  listUsers,
  findUser,
  addUser,
  updateWithPass,
  updateWithoutPass,
  deleteUser,
};
