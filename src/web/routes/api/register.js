const RegisterModel = require("../../../../databases/mongodb/models/register");
const {
  status,
  createResponse,
  handleError,
} = require("../../../../helpers/handle_response");

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
      ? res.status(status[500].code).json(handleError(err))
      : res.status(status[200].code).json(
        createResponse("SUCCESS", {
          data: { data },
        })
      );
  });
};

registers.login = (req, res, next) => {
  const { username, password } = req.body;
  RegisterModel.findOne({ username }).exec(async (err, data) => {
    err || !data
      ? res.status(status[500].code).json(handleError(err))
      : data.comparePassword(password, (err, isMatch) => {
        err || !isMatch
          ? res.status(status[403].code).json(
            createResponse("MISMATCH", {
              data: { message: "No user found" },
            })
          )
          : res.status(status[200].code).json(
            createResponse("SUCCESS", {
              data: { data },
            })
          );
      });
  });
};
