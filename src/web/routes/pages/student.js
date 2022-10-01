const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/utils");
const studentsDb = require("../../../../controllers/students");
const { handleRenderer, handleDatabase, } = require("../../../../helpers/handlers/create_response");

router
  .get("/students", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/student-list",
      runProgram: "course.student.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/student/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await studentsDb.findData("id", id) : {};
    const pages = {
      data: data,
      runPage: "pages/student-entry",
      runProgram: "course.student.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/student", (req, res, next) => {
    utils.removeImages(req.body.remove_images || [])
      .then((result) => {
        const insertDb = studentsDb.addData(req.body);
        handleDatabase(insertDb, utils.isEmptyObject, res);
      });
  })
  .put("/student/:id?", (req, res, next) => {
    utils.removeImages(req.body.remove_images || [])
      .then((result) => {
        const { ["id"]: rmId, ...data } = req.body;
        const updateDb = studentsDb.updateData(rmId, data);
        handleDatabase(updateDb, utils.isEmptyObject, res);
      });
  });

module.exports = router;
