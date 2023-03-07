const config = require("../index");

// get environment variables
const WHITELISTED_DOMAINS = config.APP.WHITELISTED_DOMAINS;

// add the client URL to the CORS policy
const whitelist = WHITELISTED_DOMAINS ? WHITELISTED_DOMAINS.split(",") : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    }
    else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = { corsOptions };
