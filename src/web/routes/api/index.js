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
const users = require("./user");
const registers = require("./register");
const userRoles = require("./user_role");
const userRegisters = require("./user_register");

// schema vialidation
const { isAuth } = require("../../../../helpers/middlewares/authenticator");
const validateWare = require("../../../../helpers/middlewares/data_validator");
const studentSchema = require("../../../../helpers/validations/student.schema");

module.exports = router;

// working with json
router.get("/user-roles", userRoles.index);

router.post("/sign-up", registers.create);
router.post("/sign-in", registers.login);

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
  .get("/registers", userRegisters.index)
  .get("/register/:id", userRegisters.show)
  .get("/register", userRegisters.showBy)
  .post("/register", userRegisters.create)
  .put("/register/:id", userRegisters.update)
  .delete("/register/:id", userRegisters.delete);
