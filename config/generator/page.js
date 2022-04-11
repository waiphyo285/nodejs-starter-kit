const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/common");
const genDatabase = require("../../../../controllers/generators");
const { handleRenderer, handleDatabase } = require("../../../../helpers/handle_response");

router
  .get("/routings", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/runnerPage-list",
      runProgram: "menuList",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/routing/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await genDatabase.findData("id", id) : {};
    const pages = {
      data: data,
      runPage: "pages/runnerPage-entry",
      runProgram: "menuEntry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/routing", (req, res, next) => {
    // insert data
    const insertDb = genDatabase.addData(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/routing/:id?", (req, res, next) => {
    // update data
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = genDatabase.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
