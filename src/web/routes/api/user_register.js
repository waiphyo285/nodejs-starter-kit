const utils = require("../../../../helpers/utils");
const registersDb = require("../../../../controllers/registers");
const { handleDatabase, } = require("../../../../helpers/handlers/create_response");

const userRegisters = (module.exports = {});

userRegisters.index = (req, res, next) => {
  const getDb = registersDb.listData();
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRegisters.show = (req, res, next) => {
  const getDb = registersDb.findData("id", req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRegisters.showBy = (req, res, next) => {
  delete req.query._;
  const getDb = registersDb.findDataBy(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRegisters.create = (req, res, next) => {
  const getDb = registersDb.addData(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRegisters.update = (req, res, next) => {
  const getDb = registersDb.updateData(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRegisters.delete = (req, res, next) => {
  const getDb = registersDb.deleteData(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRegisters.deleteAll = (req, res, next) => {
  registersDb
    .dropAll()
    .then((data) => res.send(data))
    .catch(next);
};
