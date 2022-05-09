const fs = require("fs");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// config app
const config = require("./config/index");
const { corsOptions } = require("./config/settings/cors");
const { cookieConfig } = require("./config/settings/cookies");

// jwt middleware
const { tokenRouter } = require("./middlewares/authenticator");
const { verifyToken } = require("./middlewares/authenticator");

// api router
const genRouter = require("./generator");
const authRouter = require("./src/web/routes/auth");
const apiRouter = require("./src/web/routes/api");
const fileRouter = require("./src/web/routes/files");

// get environment variables
const COOKIE_SECRET = config.APP.COOKIE_SECRET;

const app = express();
const routeModules = [];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger(`:date[clf] :method :url :status :response-time ms`));
app.use(cookieParser(COOKIE_SECRET));
app.use(cookieConfig);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

// set routes module
fs.readdirSync(__dirname + "/src/web/routes/pages").forEach(function (name) {
  const obj = require(path.join(__dirname, "/src/web/routes/pages/" + name));
  routeModules.push(obj);
});

// set locals user & token
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// connect to routing files
app.use(routeModules);
app.use(authRouter);
app.use(genRouter);

// connect to api routes
app.use("/api", verifyToken, apiRouter);

// connect to file routes
app.use("/file", verifyToken, fileRouter);

// connect to jwt routes
app.use("/d-mar", tokenRouter);

// import passport local auth
require("./config/settings/passport");

// catch 404 and hanlde error
app.use(function (req, res, next) {
  next(createError(404));
});

// handle error page
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log("Render Error ", err);
  res.status(err.status || 500);
  res.sendFile("./views/404/index.html", { root: __dirname });
});

module.exports = app;
