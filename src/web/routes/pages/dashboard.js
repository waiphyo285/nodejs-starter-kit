const express = require("express");
const router = express.Router();
const async = require("async");
const config = require("@config/index");
const checkAuth = require("@middlewares/is_logged_user");
const { getProgram } = require("@helpers/handlers/access_user");

// Import Models
const User = require("../../../../models/mongodb/models/user");
const Role = require("../../../../models/mongodb/models/user_role");
const Student = require("../../../../models/mongodb/models/student");

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

  const countRole = function (callback) {
    Role.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countStudent = function (callback) {
    Student.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  return [countUser, countRole, countStudent];
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
