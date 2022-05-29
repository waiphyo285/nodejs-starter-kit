const config = require("../../config/index");
const status = require("./handle_http_code");
const { getProgram } = require("./handle_menu");

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
  let message = `Some keys already exist`;
  const keys = Object.keys(err.keyValue);
  if (keys) message = `${keys} already exist`;
  return message;
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return message;
};

const handleValidateError = (err) => {
  let message = "Invalid property or value";
  const key = Object.keys(err.errors);
  message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return message;
};

const handleError = (err) => {
  let message = "Something went wrong";
  const { code, description } = status[500];
  if (err.code && err.code === 11000) {
    message = handleDuplicate(err);
  }
  if (err.name && err.name === "CastError") {
    message = handleCastError(err);
  }
  if (err.name && err.name === "ValidationError") {
    message = handleValidateError(err);
  }
  return { code, message, description };
};

const handleDatabase = (getDb, utils, res) => {
  getDb
    .then((data) => {
      return handleResponse(data, utils);
    })
    .then((response) => {
      res.status(response.code).json(response);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
      const responseError = handleError(err);
      res.status(responseError.code).json(responseError);
    });
};

const handleResponse = (data, utils) => {
  const create_response = !utils(data)
    ? createResponse(200, { data })
    : createResponse(403, {});
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

const createResponse = (number, rest) => {
  // create final json format to response
  const { code, message, description } = status[number];
  return { code, message, description, ...rest.data };
};

module.exports = {
  status,
  handleError,
  handleResponse,
  handleRenderer,
  handleDatabase,
  createResponse,
};
