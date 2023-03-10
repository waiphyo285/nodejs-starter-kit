const config = require('..')

const { ALGO, SECRET, SIGN_OPTION, CREDENTIAL } = config.JWT

const USER_DEFINE_ROLE = config.APP.USER_ROLES
const USER_ROLE_ACCESS = config.APP.USER_ROLE_ACCESS

module.exports = {
    encodeAlg: ALGO,
    jwtSecret: SECRET,
    jwtExpiry: SIGN_OPTION.EXP1,
    mockedUsername: CREDENTIAL.USER,
    mockedPassword: CREDENTIAL.PASS,
    defineUserRole: USER_DEFINE_ROLE,
    userRoleAccess: USER_ROLE_ACCESS,
    signOption: {
        issuer: SIGN_OPTION.ISSR,
        subject: SIGN_OPTION.SUBJ,
        audience: SIGN_OPTION.AUDI,
        expiresIn: SIGN_OPTION.EXP2,
        algorithm: SIGN_OPTION.ALGO,
    },
}
