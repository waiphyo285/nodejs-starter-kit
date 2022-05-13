const utils = require("../../../../helpers/common");
const citiesDb = require("../../../../controllers/cities");
const { handleDatabase } = require("../../../../helpers/handle_response");

const cities = (module.exports = {});

cities.index = (req, res, next) => {
  const getDb = citiesDb.listData();
  handleDatabase(getDb, utils.isEmptyObject, res);
};

cities.show = (req, res, next) => {
  const getDb = citiesDb.findData("id", req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

cities.showBy = (req, res, next) => {
  delete req.query._;
  const getDb = citiesDb.findDataBy(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

cities.create = (req, res, next) => {
  const getDb = citiesDb.addData(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

cities.update = (req, res, next) => {
  const getDb = citiesDb.updateData(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

cities.delete = (req, res, next) => {
  const getDb = citiesDb.deleteData(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

cities.deleteAll = (req, res, next) => {
  citiesDb
    .dropAll()
    .then((data) =>
      res.send(data)
    )
    .catch(next);
};
