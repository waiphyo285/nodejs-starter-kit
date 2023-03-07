const express = require("express");
const router = express.Router();
const utils = require("@helpers/utils");
const usersDb = require("@controllers/users");
const checkAuth = require("@middlewares/dto/is_valid_user");
const {
  handleRenderer,
  handleDatabase,
} = require("@helpers/handlers/response");

router
  .get("/get_user", checkAuth, (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send({ user: req.user });
  })
  .get("/users", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/user-list",
      runProgram: "administrative.user.list",
    };
    handleRenderer(req.user, pages, res);
  })
  .get("/user/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await usersDb.findUserById(id) : {};
    const pages = {
      data: data.data || {},
      runPage: "pages/user-entry",
      runProgram: "administrative.user.entry",
    };
    handleRenderer(req.user, pages, res);
  })
  .post("/user", (req, res, next) => {
    const insertDb = usersDb.addUser(req.body);
    handleDatabase(insertDb, utils.isEmptyObject, res);
  })
  .put("/user/:id?", (req, res, next) => {
    const { ["id"]: rmId, ...data } = req.body;
    const updateDb = usersDb.updateWithPass(rmId, data);
    handleDatabase(updateDb, utils.isEmptyObject, res);
  });

module.exports = router;
