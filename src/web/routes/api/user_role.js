const programAccess = require("../../../../config/program-access.json");
const { createResponse, handleError } = require("../../../../helpers/handlers/create_response");

const userRoles = (module.exports = {});

userRoles.index = (req, res, next) => {
  try {
    const data = JSON.parse(JSON.stringify(programAccess));
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
