require('dotenv').config()

const D = 'developer'
const A = 'admin'
const M = 'manager'
const S = 'staff'

const USER_ROLE_ACCESS = {
    [D]: '1,1,1',
    [A]: '1,1,1',
    [M]: '1,1,0',
    [S]: '1,0,0',
}

module.exports = {
    HOST: process.env.APP_HOST,
    PORT: process.env.APP_PORT,
    NODE_ENV: process.env.NODE_ENV,
    APP: {
        NAME: process.env.APP_NAME,
        FILE: process.env.APP_FILE,
        DESC: process.env.APP_DESC,
        USER_ROLES: [D, A, M, S],
        USER_ROLE_ACCESS: USER_ROLE_ACCESS,
        DEF_LANG: process.env.DEF_LANG,
    },
    ETAVIRP: {
        DATABASE: process.env.DATABASE_NAME,
        WHITELISTED: process.env.WHITELISTED,
        CSRF_COOKIE: process.env.CSRF_COOKIE,
        CSRF_SECRET: process.env.CSRF_SECRET,
        COOKIE_SECRET: process.env.COOKIE_SECRET,
        COOKIE_SESSION: process.env.COOKIE_SESSION,
    },
    MONGO: {
        HOST: process.env.MONGO_HOST,
        PORT: process.env.MONGO_PORT,
        USER: process.env.MONGO_USER,
        PASS: process.env.MONGO_PASS,
    },
    MYSQL: {
        HOST: process.env.MYSQL_HOST,
        PORT: process.env.MYSQL_PORT,
        USER: process.env.MYSQL_USER,
        PASS: process.env.MYSQL_PASS,
        DIALECT: process.env.MYSQL_DIALECT,
        POOL_MIN: process.env.MYSQL_POOL_MIN,
        POOL_MAX: process.env.MYSQL_POOL_MAX,
        POOL_IDL: process.env.MYSQL_POOL_IDL,
        POOL_ACQ: process.env.MYSQL_POOL_ACQ,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
        USER: process.env.REDIS_USER,
        PASS: process.env.REDIS_PASS,
    },
    JWT: {
        HASH: 'SHA256',
        TEXT: 'THETEMPLATE',
        ALGO: 'aes-256-cbc',
        SECRET: process.env.JWT_SECRET,
        CREDENTIAL: {
            USER: process.env.JWT_USER,
            PASS: process.env.JWT_PASS,
        },
        SIGN_OPTION: {
            ISSR: process.env.JWT_ISSR,
            SUBJ: process.env.JWT_SUBJ,
            AUDI: process.env.JWT_AUDI,
            ALGO: process.env.JWT_ALGO,
            EXP1: process.env.JWT_EXP1,
            EXP2: process.env.JWT_EXP2,
        },
        ROLE_OPTION: {
            D,
            A,
            M,
            S,
        },
    },
}
