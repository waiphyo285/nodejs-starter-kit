const RegisterModel = require("../../../../models/mongodb/models/register");
const { createResponse, handleError, } = require("../../../../helpers/handlers/create_response");

const registers = (module.exports = {});

registers.create = (req, res, next) => {
  const { fullname, username, password } = req.body;
  const registerModel = new RegisterModel({
    fullname,
    username,
    password,
  });
  // save the user to database
  registerModel.save((err, data) => {
    err || !data
      ? res.status(500).json(handleError(err))
      : res.status(200).json(createResponse(200, { data: { data }, }));

  });
};

registers.login = (req, res, next) => {
  const { username, password } = req.body;
  RegisterModel.findOne({ username }).exec(async (err, data) => {
    err || !data
      ? res.status(500).json(handleError(err))
      : data.comparePassword(password, (err, isMatch) => {
        err || !isMatch
          ? res.status(403).json(createResponse(403, {}))
          : res.status(200).json(createResponse(200, { data: { data }, }));
      });
  });
};
