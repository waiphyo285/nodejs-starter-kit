const cookieSession = require('cookie-session')
const config = require('@config/index')

// get environment variables
const NODE_ENV = config.NODE_ENV
const COOKIE_SESSION = config.ETAVIRP.COOKIE_SESSION

const cookieOption = {
    development: {
        maxAge: 8 * 60 * 60 * 1000, // 8h
    },
    production: {
        maxAge: 1 * 60 * 60 * 1000, // 1h
    },
}

// set cookie config
const cookieConfig = cookieSession({
    name: 'session',
    keys: [COOKIE_SESSION],
    // Cookie Options
    ...cookieOption[NODE_ENV],
})

module.exports = { cookieConfig }
