const config = require("../../config/index");
const { isAuth } = require("../../middlewares/authentication");

// Util authorized methods

const D = config.JWT.ROLE_OPTION.D;
const A = config.JWT.ROLE_OPTION.A;
const M = config.JWT.ROLE_OPTION.M;
const S = config.JWT.ROLE_OPTION.S;

const isD = isAuth([D])
const isDA = isAuth([D, A])
const isDAM = isAuth([D, A, M])
const isDAMS = isAuth([D, A, M, S])

module.exports = {
    D,
    A,
    M,
    S,
    isD,
    isDA,
    isDAM,
    isDAMS
}