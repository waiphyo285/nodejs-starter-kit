const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/utils");
const userRolesDb = require("../../../../controllers/user_roles");
const programMenu = require("../../../../config/program-menu.json");
const { handleRenderer, handleDatabase, } = require("../../../../helpers/handlers/create_response");

router
  .get("/user_roles", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/user-role-list",
      runProgram: "administrative.role.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/user_role/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id
      ? await userRolesDb.findData("id", id)
      : { program: JSON.parse(JSON.stringify(programMenu)) };
    const pages = {
      data: data,
      runPage: "pages/user-role-entry",
      runProgram: "administrative.role.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/user_role", (req, res, next) => {
    const { program: tmpPorgam, ...rest } = req.body
    console.log("Rest body ", rest)

    tmpPorgam.forEach((menu) => {
      console.log("transform `actions & access` ", menu)
    });

    // const insertDb = userRolesDb.addData(req.body);
    // handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/user_role/:id?", (req, res, next) => {
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = userRolesDb.updateData(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;