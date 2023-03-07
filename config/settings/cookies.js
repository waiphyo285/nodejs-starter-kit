const cookieSession = require("cookie-session");
const config = require("@config/index");

// get environment variables
const COOKIE_SESSION = config.APP.COOKIE_SESSION;

// set cookie config
const cookieConfig = cookieSession({
  name: "session",
  keys: [COOKIE_SESSION],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

module.exports = { cookieConfig };
