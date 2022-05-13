const programAccess = require("../../../../config/program-access.json");
const {
  status,
  createResponse,
  handleError,
} = require("../../../../helpers/handle_response");

const userRoles = (module.exports = {});

userRoles.index = (req, res, next) => {
  try {
    const data = JSON.parse(JSON.stringify(programAccess));
    res
      .status(status[200].code)
      .json(createResponse("SUCCESS", { data: { data } }));
  }
  catch (error) {
    console.log(`Error ${err}`);
    res.status(status[500].code).json(handleError(err));
  }
};
