const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/common");
const townshipsDb = require("../../../../controllers/townships");
const {
  handleRenderer,
  handleDatabase,
} = require("../../../../helpers/handle_response");

router
  .get("/townships", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/township-list",
      runProgram: "generalMenu.townshipSubMenu.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/township/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await townshipsDb.findData("id", id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/township-entry",
      runProgram: "generalMenu.townshipSubMenu.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/township", (req, res, next) => {
    // insert data
    const insertDb = townshipsDb.addData(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/township/:id?", (req, res, next) => {
    // update data
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = townshipsDb.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
