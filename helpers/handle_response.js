const config = require("../config/index");
const status = require("./handle_http_code");
const { getProgram } = require("./menu_access");

/** Sample response
 *
 * SUCCESS  { status, data }
 * TOKEN    { status, token }
 * FAIL     { status, message }
 * ERROR    { status, message }
 * MISMATCH { status, messaage }
 *
 */

const handleDuplicate = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  if (keys) message = `${keys} already exists`;
  return { status: "ERROR", message };
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return { status: "ERROR", message };
};

const handleValidateError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return { status: "ERROR", message };
};

const handleError = (err) => {
  let create_response = {
    status: "ERROR",
    message: "Something went wrong.",
  };
  if (err.code && err.code === 11000) {
    create_response = handleDuplicate(err);
  }
  if (err.name && err.name === "CastError") {
    create_response = handleCastError(err);
  }
  if (err.name && err.name === "ValidationError") {
    create_response = handleValidateError(err);
  }
  return create_response;
};

const handleDatabase = (getDb, utils, res) => {
  getDb
    .then((data) => {
      return handleResponse(data, utils);
    })
    .then((reponse) => {
      res.status(status[200].code).json(reponse);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      res.status(status[500].code).json(handleError(err));
    });
};

const handleResponse = (data, utils) => {
  const create_response = !utils(data)
    ? createResponse("SUCCESS", { data })
    : createResponse("FAIL", {
        data: { message: "Something went wrong." },
      });
  return create_response;
};

const handleRenderer = (user, pages, res) => {
  const { runPage, runProgram, data } = pages;
  const getProgramMenu = getProgram(user, runProgram);
  const getPageData = { app: config.APP, data: data };
  res.render(runPage, {
    ...getPageData,
    ...getProgramMenu,
  });
};

const createResponse = (status, rest) => {
  // create final json format to response
  // console.log({ status, ...rest.data });
  return { status, ...rest.data };
};

module.exports = {
  status,
  handleError,
  handleResponse,
  handleRenderer,
  handleDatabase,
  createResponse,
};
