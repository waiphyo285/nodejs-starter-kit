const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("@config/index");
const User = require("@models/mongodb/schemas/user");
const { signToken_1 } = require("@middlewares/authentication");

router
  .get("/signup", (req, res, next) => {
    res.render("auth/signup", {
      title: "Create new account",
      buttonText: "Sign Up",
      app: config.APP,
    });
  })
  .post("/signup", (req, res) => {
    // handle the case where we don't detect the browser
    const errMsg = "Username or phone is already existed.";
    const user = new User({
      ...req.body,
      role: "developer", // just dev
    });

    user.save(function (err, user) {
      if (err) {
        console.log("Registration Error ", err);
        res.redirect("/signup?message=" + errMsg);
      }
      else {
        user["latmat"] = signToken_1({
          userrole: user.role,
          username: user.username,
          password: user.password,
        });
        req.session.user = user;
        res.redirect("/");
      }
    });
  });

router
  .get("/login", (req, res, next) => {
    res.render("auth/login", {
      title: "Welcome back",
      buttonText: "Sign In",
      app: config.APP,
    });
  })
  .post("/login", (req, res, next) => {
    // handle the case where we don't detect the browser
    const errMsg = "Incorrect access is found. Try again.";
    passport.authenticate("local", { failureRedirect: "/login" }, function (err, user, info) {
      if (err) return next(err);
      if (!user) return res.redirect("/login?message=" + errMsg);

      req.logIn(user, function (err) {
        if (err) return next(err);
        user["latmat"] = signToken_1({
          userrole: user.role,
          username: user.username,
          password: user.password,
        });

        req.session.user = user;
        const redirectTo = req.session.redirectTo;
        delete req.session.redirectTo;
        res.redirect(redirectTo || "/");
      });
    }
    )(req, res, next);
  });

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
