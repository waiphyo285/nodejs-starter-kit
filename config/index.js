require("dotenv").config();

module.exports = {
  HOST: process.env.APP_HOST,
  PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  APP: {
    NAME: "Template",
    FILE: "template-file",
    DESC: "Itemplate Core Project",
    DATABASE: process.env.DATABASE_NAME,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    WHITELISTED_DOMAINS: process.env.WHITELISTED_DOMAINS,
    ROLES: ["admin", "manager", "cashier"],
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
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    USER: process.env.REDIS_USER,
    PASS: process.env.REDIS_PASS,
  },
  JWT: {
    HASH: "SHA256",
    TEXT: "9E0HU8L48",
    SECRET: "C57B465081874C256CFD78D9EC226DCD111D03E08E21ABB8DCAF0CF7DA71D362",
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
  },
};
