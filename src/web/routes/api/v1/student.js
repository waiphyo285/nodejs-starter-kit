const utils = require("@helpers/utils");
const studentsDb = require("@controllers/students");
const { handleDatabase } = require("@helpers/handlers/create_response");

const students = (module.exports = {});

students.index = (req, res, next) => {
  const getDb = studentsDb.listData(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

students.show = (req, res, next) => {
  const getDb = studentsDb.findDataById(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

students.showBy = (req, res, next) => {
  delete req.query._;
  const getDb = studentsDb.findDataBy(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

students.create = (req, res, next) => {
  const getDb = studentsDb.addData(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

students.update = (req, res, next) => {
  const getDb = studentsDb.updateData(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

students.delete = (req, res, next) => {
  const getDb = studentsDb.deleteData(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

students.deleteAll = (req, res, next) => {
  studentsDb
    .dropAll()
    .then((data) => res.send(data))
    .catch(next);
};
