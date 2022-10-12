const config = require("..");

const {
  ALGO,
  SECRET,
  SIGN_OPTION,
  CREDENTIAL,
} = config.JWT;

const USER_ROLE_ACCESS = {
  admin: "1,1,1",
  manager: "1,1,0",
  staff: "1,0,0",
  developer: "1,1,1",
}

module.exports = {
  encodeAlg: ALGO,
  jwtSecret: SECRET,
  jwtExpiry: SIGN_OPTION.EXP1,
  mockedUsername: CREDENTIAL.USER,
  mockedPassword: CREDENTIAL.PASS,
  defineUserRole: config.APP.ROLES,
  userRoleAccess: USER_ROLE_ACCESS,
  signOption: {
    issuer: SIGN_OPTION.ISSR,
    subject: SIGN_OPTION.SUBJ,
    audience: SIGN_OPTION.AUDI,
    expiresIn: SIGN_OPTION.EXP2,
    algorithm: SIGN_OPTION.ALGO,
  },
};
