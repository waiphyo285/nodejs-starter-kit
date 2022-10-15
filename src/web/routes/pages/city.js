const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/utils");
const citiesDb = require("../../../../controllers/cities");
const { handleRenderer, handleDatabase } = require("../../../../helpers/handlers/create_response");

router
  .get("/cities", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/city-list",
      runProgram: "general.region.list",
    };
    handleRenderer(req.user, pages, res);
  })
  .get("/city/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await citiesDb.findDataById(id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/city-entry",
      runProgram: "general.region.entry",
    };
    handleRenderer(req.user, pages, res);
  })
  .post("/city", (req, res, next) => {
    const insertDb = citiesDb.addData(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/city/:id?", (req, res, next) => {
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = citiesDb.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
