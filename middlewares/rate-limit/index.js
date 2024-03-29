const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = { rateLimiter }
