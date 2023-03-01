const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  max: 1500,
  windowMs: 15 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { rateLimiter };
