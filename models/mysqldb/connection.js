const Sequelize = require('sequelize')
const config = require('@config')
const clr = require('@helpers/config/log_color')

// Set environment variables
const env = config.NODE_ENV || 'development'
const host = config.MYSQL.HOST || 'localhost'
const port = config.MYSQL.PORT || 3306
const user = config.MYSQL.USER || 'root'
const pass = config.MYSQL.PASS || 'no-pass'
const dbName = config.ETAVIRP.DATABASE || 'no_db'

const dialect = config.MYSQL.DIALECT
const pool_min = config.MYSQL.POOL_MIN
const pool_max = config.MYSQL.POOL_MAX
const pool_idl = config.MYSQL.POOL_IDL
const pool_acq = config.MYSQL.POOL_ACQ

const database = (module.exports = {})

const instance = new Sequelize(dbName, user, '', {
    host: host,
    dialect: dialect,
    operatorsAliases: 0,
    pool: {
        min: Number(pool_min),
        max: Number(pool_max),
        idle: Number(pool_idl),
        acquire: Number(pool_acq),
    },
    logging: console.log(
        `${clr.fg.magenta}Database: 😃 MySQL (${env}) is connected!`
    ),
})

database.Sequelize = Sequelize
database.sequelize = instance

database.tutorials = require('./schemas/teacher')(instance, Sequelize)

// database.sequelize
//     .sync()
//     .then(() => {
//         console.log(
//             `${clr.fg.magenta}Database: 😃 MySQL (${env}) is dropped and re-synced!`
//         )
//     })
//     .catch((error) =>
//         console.log(`${clr.fg.red}Database: 😡 MySQL connection error`, error)
//     )
