const utils = require("@helpers/utils");
const userRolesDb = require("@controllers/user_roles");
const programConfig = require("@config/program-config.json");
const { createResponse, handleDatabase, handleError } = require("@helpers/handlers/create_response");

const userRole = (module.exports = {});

userRole.config = (req, res, next) => {
  try {
    const data = JSON.parse(JSON.stringify(programConfig.role));
    const locales = res.locals.i18n.translations;
    res
      .status(200)
      .json(createResponse(200, { data: { data } }, locales));
  }
  catch (error) {
    console.log(`Error ${err}`);
    res.status(500).json(handleError(err, locales));
  }
};

userRole.index = (req, res, next) => {
  const getDb = userRolesDb.listData();
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRole.show = (req, res, next) => {
  const getDb = userRolesDb.findDataById(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRole.showBy = (req, res, next) => {
  delete req.query._;
  const getDb = userRolesDb.findDataBy(req.query);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRole.create = (req, res, next) => {
  const getDb = userRolesDb.addData(req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRole.update = (req, res, next) => {
  const getDb = userRolesDb.updateData(req.params.id, req.body);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRole.delete = (req, res, next) => {
  const getDb = userRolesDb.deleteData(req.params.id);
  handleDatabase(getDb, utils.isEmptyObject, res);
};

userRole.deleteAll = (req, res, next) => {
  userRolesDb
    .dropAll()
    .then((data) => res.send(data))
    .catch(next);
};