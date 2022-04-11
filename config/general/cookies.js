// cookie session
const cookieSession = require("cookie-session");

// set cookie config
const cookieConfig = cookieSession({
  name: "session",
  keys: ["wpd3v8@ck3nd"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

module.exports = { cookieConfig };
