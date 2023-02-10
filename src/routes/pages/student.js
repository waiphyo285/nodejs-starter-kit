const express = require("express");
const router = express.Router();
const utils = require("@helpers/utils");
const studentsDb = require("@controllers/students");
const checkAuth = require("@middlewares/is_logged_user");
const validateWare = require("@middlewares/data_validator");
const studentJoi = require("@models/mongodb/validations/student.schema");
const {
  handleRenderer,
  handleDatabase,
} = require("@helpers/handlers/create_response");

router
  .get("/students", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/student-list",
      runProgram: "course.student.list",
    };
    handleRenderer(req.user, pages, res);
  })
  .get("/student/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await studentsDb.findDataById(id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/student-entry",
      runProgram: "course.student.entry",
    };
    handleRenderer(req.user, pages, res);
  })
  .post("/student", validateWare(studentJoi), (req, res, next) => {
    utils.removeImages(req.body.remove_images || []).then((result) => {
      req.body.images = req.body.images;
      const insertDb = studentsDb.addData(req.body);
      handleDatabase(insertDb, utils.isEmptyObject, res);
    });
  })
  .put("/student/:id?", validateWare(studentJoi), (req, res, next) => {
    utils.removeImages(req.body.remove_images || []).then((result) => {
      const { ["id"]: rmId, ...data } = req.body;
      data.images = data.images;
      const updateDb = studentsDb.updateData(rmId, data);
      handleDatabase(updateDb, utils.isEmptyObject, res);
    });
  });

module.exports = router;
