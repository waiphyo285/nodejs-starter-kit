const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/utils");
const registersDb = require("../../../../controllers/registers");
const { handleRenderer, handleDatabase, } = require("../../../../helpers/handlers/create_response");

router
  .get("/registers", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/user-register-list",
      runProgram: "registration.public_user.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/register/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await registersDb.findData("id", id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/user-register-entry",
      runProgram: "registration.public_user.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/register", (req, res, next) => {
    // insert data
    const insertDb = registersDb.addData(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/register/:id?", (req, res, next) => {

    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = registersDb.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
