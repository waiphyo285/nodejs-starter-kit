const express = require("express");
const router = express.Router();

// api routing
const dev = require("./develop");
const students = require("./student");

// user routing
const users = require("./user");
const userRoles = require("./user_role");

// helpers functions
const { isDA } = require("@helpers/handlers/access_url");

// middlewares
const validateWare = require("@middlewares/data_validator");

// schema validations
const studentSchema = require("@models/mongodb/validations/student.schema");

module.exports = router;

router
  .get("/users", isDA, users.index)
  .get("/user/:id", isDA, users.show)
  .post("/user", isDA, users.create)
  .put("/user/:id", isDA, users.updateWithPass)
  .put("/user-no-pass/:id", isDA, users.updateWithoutPass)
  .delete("/user/:id", isDA, users.delete);

router
  .get("/config-roles", isDA, userRoles.config)
  .get("/user_roles", isDA, userRoles.index)
  .get("/user_role/:id", isDA, userRoles.show)
  .get("/user_role", isDA, userRoles.showBy)
  .post("/user_role", isDA, userRoles.create)
  .post("/user_role/:id", isDA, userRoles.update)
  .delete("/user_role/:id", isDA, userRoles.delete);

router
  .get("/students", students.index)
  .get("/student/:id", students.show)
  .get("/student", students.showBy)
  .post("/student", validateWare(studentSchema), students.create)
  .put("/student/:id", validateWare(studentSchema), students.update)
  .delete("/student/:id", students.delete);