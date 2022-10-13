const express = require("express");
const router = express.Router();
const async = require("async");
const checkAuth = require("../check_auth");
const config = require("../../../../config/index");
const { getProgram } = require("../../../../helpers/handlers/access_user");

// Import Models
const User = require("../../../../models/mongodb/models/user");
const City = require("../../../../models/mongodb/models/city");
const Township = require("../../../../models/mongodb/models/township");
const Register = require("../../../../models/mongodb/models/register");

const dashbordCard = async () => {
  const countUser = function (callback) {
    User.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countRegister = function (callback) {
    Register.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countCity = function (callback) {
    City.countDocuments({}).exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countTownship = function (callback) {
    Township.countDocuments({}).exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  return [countUser, countRegister, countCity, countTownship];
};

router.get("/", checkAuth, async (req, res, next) => {
  async.parallel(await dashbordCard(), async function (error, results) {
    const curUserProgram = await getProgram(req.user, "dashboard.null.null");
    res.render("pages/dashboard", {
      ...curUserProgram,
      app: config.APP,
      data: results,
    });
  });
});

module.exports = router;
