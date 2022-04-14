const config = require("../../config");

module.exports = {
  encodeAlg: config.JWT.ALGO,
  jwtSecret: config.JWT.SECRET,
  jwtExpiry: config.JWT.SIGN_OPTION.EXP1,
  mockedUsername: config.JWT.CREDENTIAL.USER,
  mockedPassword: config.JWT.CREDENTIAL.PASS,
  defineUserRole: config.APP.ROLES,
  userRoleAccess: {
    admin: "1,1,1",
    manager: "1,1,0",
    cashier: "1,0,0",
  },
  signOption: {
    issuer: config.JWT.SIGN_OPTION.ISSR,
    subject: config.JWT.SIGN_OPTION.SUBJ,
    audience: config.JWT.SIGN_OPTION.AUDI,
    expiresIn: config.JWT.SIGN_OPTION.EXP2,
    algorithm: config.JWT.SIGN_OPTION.ALGO,
  },
};
