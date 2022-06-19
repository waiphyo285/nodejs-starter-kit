const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/utils");
const usersDb = require("../../../../controllers/users");
const {
  handleRenderer,
  handleDatabase,
} = require("../../../../helpers/handlers/json_response");
const { isAuth } = require("../../../../middlewares/authenticator");

router
  .get("/get_user", checkAuth, isAuth("admin"), (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send({ user: req.user });
  })
  .get("/users", checkAuth, isAuth("admin"), (req, res, next) => {
    const pages = {
      runPage: "pages/user-list",
      runProgram: "adminMenu.userSubMenu.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/user/:id?", checkAuth, isAuth("admin"), async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await usersDb.findUser("id", id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/user-entry",
      runProgram: "adminMenu.userSubMenu.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/user", isAuth("admin"), (req, res, next) => {
    const insertDb = usersDb.addUser(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/user/:id?", isAuth("admin"), (req, res, next) => {
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = usersDb.updateWithPass(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
