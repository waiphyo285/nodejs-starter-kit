const utils = require("../../../../helpers/utils");
const usersDb = require("../../../../controllers/users");
const { handleDatabase, } = require("../../../../helpers/handlers/create_response");

const users = (module.exports = {});

users.index = (req, res, next) => {
  const getDb = usersDb.listUsers();
  handleDatabase(getDb, utils.isEmptyObject, res);
};

users.show = (req, res, next) => {
  const getDb = usersDb.findUser("id", req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

users.create = (req, res, next) => {
  const getDb = usersDb.addUser(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

users.updateWithPass = (req, res, next) => {
  const getDb = usersDb.updateWithPass(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

users.updateWithoutPass = (req, res, next) => {
  const getDb = usersDb.updateWithoutPass(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

users.delete = (req, res, next) => {
  const getDb = usersDb.deleteUser(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};
