const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/common");
const teachersDb = require("../../../../controllers/teachers");
const {
  handleRenderer,
  handleDatabase,
} = require("../../../../helpers/handle_response");

router
  .get("/teachers", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/teacher-list",
      runProgram: "courseMenu.teacherSubMenu.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/teacher/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await teachersDb.findData("id", id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/teacher-entry",
      runProgram: "courseMenu.teacherSubMenu.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/teacher", (req, res, next) => {
    // insert data
    const insertDb = teachersDb.addData(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/teacher/:id?", (req, res, next) => {
    // update data
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = teachersDb.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
