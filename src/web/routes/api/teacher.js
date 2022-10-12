const utils = require("../../../../helpers/utils");
const teachersDb = require("../../../../controllers/teachers");
const { handleDatabase } = require("../../../../helpers/handlers/create_response");

const teachers = (module.exports = {});

teachers.index = (req, res, next) => {
  const getDb = teachersDb.listData();
  handleDatabase(getDb, utils.isEmptyObject, res);
};

teachers.show = (req, res, next) => {
  const getDb = teachersDb.findData("id", req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

teachers.showBy = (req, res, next) => {
  delete req.query._;
  const getDb = teachersDb.findDataBy(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

teachers.create = (req, res, next) => {
  const getDb = teachersDb.addData(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

teachers.update = (req, res, next) => {
  const getDb = teachersDb.updateData(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

teachers.delete = (req, res, next) => {
  const getDb = teachersDb.deleteData(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

teachers.deleteAll = (req, res, next) => {
  teachersDb
    .dropAll()
    .then((data) => res.send(data))
    .catch(next);
};
