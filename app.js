const fs = require('fs')
const path = require('path')
const cors = require('cors')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const passport = require('passport')

// passport local auth
require('./config/settings/passport')

// app configs
const config = require('@config/index')

// app settings
const { corsOptions } = require('@config/settings/cors')
const { cookieConfig } = require('@config/settings/cookies')
const { rateLimiter } = require('@config/settings/rate-limit')
const { morganLogger } = require('@config/settings/logger')
const { langI18n } = require('@config/settings/locale')

// protect routes
const { tokenRouter } = require('@middlewares/token/jwt_token')
const { verifyToken } = require('@middlewares/token/jwt_token')
const {
    csrfRouter,
    csrfProtection: doubleCsrfProtection,
} = require('@middlewares/token/csrf_token')

// app features
const { swgDocs } = require('@middlewares/swagger/index')

// api router
const genRouter = require('./generator')
const authRouter = require('@src/routes/auth')
const apiV1Router = require('@src/routes/api/v1')
const fileRouter = require('@src/routes/files')

// get environment variables
const NODE_ENV = config.NODE_ENV
const COOKIE_SECRET = config.ETAVIRP.COOKIE_SECRET

const app = express()
const routeModules = []

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// app.use(rateLimiter);
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(COOKIE_SECRET))
app.use(langI18n.middleware())
app.use(cookieConfig)
app.use(morganLogger)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

// set routes module
fs.readdirSync(__dirname + '/src/routes/pages').forEach(function (name) {
    const obj = require(path.join(__dirname, '/src/routes/pages/' + name))
    routeModules.push(obj)
})

// set locals user & token
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

// connect to api routes
app.use('/d-mar', csrfRouter)
app.use('/d-mar', tokenRouter)
app.use('/file', verifyToken, fileRouter)
app.use('/api/v1', verifyToken, apiV1Router)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swgDocs))

// connect to page routes
app.use(genRouter)
app.use(authRouter)
app.use(doubleCsrfProtection, routeModules)

// catch 404 and hanlde error
app.use(function (req, res, next) {
    next(createError(404))
})

// handle error page
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.sendFile('./views/404/index.html', { root: __dirname })
})

module.exports = app
