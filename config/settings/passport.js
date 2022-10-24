const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// auth model
const UserModel = require("@models/mongodb/schemas/user");

// passport local authentication
passport.serializeUser(function (user, done) {
  // the values returned here will be used to deserializeUser
  // this can be use for further logins
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // the values returned from serializeUser
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, done) => {
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false);
        user.comparePassword(password, (err, match) => {
          if (err) return done(err, false);
          if (match) return done(null, user);
          return done(null, false);
        });
      });
    }
  )
);
