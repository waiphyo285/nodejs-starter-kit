const express = require("express");
const router = express.Router();
const utils = require("@helpers/utils");
const genDatabase = require("@controllers/generators");
const checkAuth = require("@middlewares/is_logged_user");
const { handleRenderer, handleDatabase, } = require("@helpers/handlers/create_response");

router
  .get("/routings", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/runnerPage-list",
      runProgram: "menuList",
    };
    handleRenderer(req.user, pages, res);
  })
  .get("/routing/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await genDatabase.findDataById(id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/runnerPage-entry",
      runProgram: "menuEntry",
    };
    handleRenderer(req.user, pages, res);
  })
  .post("/routing", (req, res, next) => {
    const insertDb = genDatabase.addData(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/routing/:id?", (req, res, next) => {
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = genDatabase.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
