const express = require("express");
const router = express.Router();

// api routing
const dev = require("./develop");
const students = require("./student");
const teachers = require("./teacher");

// setup routing
const cities = require("./city");
const townships = require("./township");

// user routing
const auth = require("./auth");
const users = require("./user");
const userRoles = require("./user_role");
const registers = require("./user_register");

// middlewares
const { isAuth } = require("../../../../middlewares/authentication");
const validateWare = require("../../../../middlewares/data_validator");

// schema validations
const studentSchema = require("../../../../models/mongodb/validations/student.schema");

module.exports = router;

// working with json
router.get("/config-roles", userRoles.config);

router.post("/sign-up", auth.create);
router.post("/sign-in", auth.login);

router
  .get("/users", isAuth("admin"), users.index)
  .get("/user/:id", isAuth("admin"), users.show)
  .post("/user", isAuth("admin"), users.create)
  .put("/user/:id", isAuth("admin"), users.updateWithPass)
  .put("/user-no-pass/:id", isAuth("admin"), users.updateWithoutPass)
  .delete("/user/:id", isAuth("admin"), users.delete);

router
  .get("/townships", townships.index)
  .get("/township/:id", townships.show)
  .get("/township", townships.showBy)
  .post("/township", townships.create)
  .put("/township/:id", townships.update)
  .delete("/township/:id", townships.delete);

router
  .get("/cities", cities.index)
  .get("/city/:id", cities.show)
  .get("/city", cities.showBy)
  .post("/city", cities.create)
  .put("/city/:id", cities.update)
  .delete("/city/:id", cities.delete);

router
  .get("/students", students.index)
  .get("/student/:id", students.show)
  .get("/student", students.showBy)
  .post("/student", validateWare(studentSchema), students.create)
  .put("/student/:id", validateWare(studentSchema), students.update)
  .delete("/student/:id", students.delete);

router
  .get("/teachers", teachers.index)
  .get("/teacher/:id", teachers.show)
  .get("/teacher", teachers.showBy)
  .post("/teacher", teachers.create)
  .put("/teacher/:id", teachers.update)
  .delete("/teacher/:id", teachers.delete);

router
  .get("/registers", registers.index)
  .get("/register/:id", registers.show)
  .get("/register", registers.showBy)
  .post("/register", registers.create)
  .put("/register/:id", registers.update)
  .delete("/register/:id", registers.delete);

router
  .get("/user_roles", userRoles.index)
  .get("/user_role/:id", userRoles.show)
  .get("/user_role", userRoles.showBy)
  .post("/user_role", userRoles.create)
  .post("/user_role/:id", userRoles.update)
  .delete("/user_role/:id", userRoles.delete);
