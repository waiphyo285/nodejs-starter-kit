const utils = require("../../../../helpers/utils");
const townshipsDb = require("../../../../controllers/townships");
const { handleDatabase } = require("../../../../helpers/handlers/create_response");

const townships = (module.exports = {});

townships.index = (req, res, next) => {
  const getDb = townshipsDb.listData();
  handleDatabase(getDb, utils.isEmptyObject, res);
};

townships.show = (req, res, next) => {
  const getDb = townshipsDb.findDataById(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

townships.showBy = (req, res, next) => {
  delete req.query._;
  const getDb = townshipsDb.findDataBy(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

townships.create = (req, res, next) => {
  const getDb = townshipsDb.addData(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

townships.update = (req, res, next) => {
  const getDb = townshipsDb.updateData(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

townships.delete = (req, res, next) => {
  const getDb = townshipsDb.deleteData(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

townships.deleteAll = (req, res, next) => {
  townshipsDb
    .dropAll()
    .then((data) => res.send(data))
    .catch(next);
};
