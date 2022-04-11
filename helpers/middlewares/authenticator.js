const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { status, createResponse } = require("../../helpers/handle_response");

// use 'utf8' to get string instead of byte array  (512 bit key)
const publicKEY = fs.readFileSync(
  path.join(__dirname, "../../config/rsa-ssh/public.key"),
  { encoding: "utf-8" }
);

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../../config/rsa-ssh/private.key"),
  { encoding: "utf-8" }
);

const JWT_SECRET = config.JWT.SECRET;
const JWT_EXPIRY = config.JWT.SIGN_OPTION.EXP1;

const defineUserRole = config.APP.ROLES;
const mockedUsername = config.JWT.CREDENTIAL.USER;
const mockedPassword = config.JWT.CREDENTIAL.PASS;

const signOption = {
  issuer: config.JWT.SIGN_OPTION.ISSR,
  subject: config.JWT.SIGN_OPTION.SUBJ,
  audience: config.JWT.SIGN_OPTION.AUDI,
  expiresIn: config.JWT.SIGN_OPTION.EXP2,
  algorithm: config.JWT.SIGN_OPTION.ALGO,
};

const UserRoleAccess = {
  admin: "1,1,1",
  manager: "1,1,0",
  cashier: "1,0,0",
};

// Compare permssion
const sumPermission = (role) =>
  UserRoleAccess[role].split(",").reduce((sum, cur) => +sum + +cur, 0);

// Generate methods

const GenerateToken = (req, res) => {
  checkPayload(req.body)
    ? res.status(status[200].code).json(
        createResponse("SUCCESS", {
          data: { token: getSignMethod(signJwtToken, req.body) },
        })
      )
    : res.status(status[401].code).json(
        createResponse("FAIL", {
          data: { message: "Authentication is failed" },
        })
      );
};

const checkPayload = ({ username, password, userrole, method_id }) => {
  return (
    defineUserRole.indexOf(userrole) !== -1 &&
    mockedUsername === username &&
    mockedPassword === password &&
    method_id
  );
};

const getSignMethod = (obj, { username, password, userrole, method_id }) => {
  const signJwtMethod = {
    one: () => obj.method_1({ username, userrole }),
    two: () => obj.method_2({ username, userrole, password }),
  };
  return signJwtMethod[method_id]();
};

const signJwtToken = {
  // dev: expires in 24h for method 1 && 2
  method_1: (payload) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY }),
  method_2: (payload) => jwt.sign(payload, privateKEY, signOption),
};

// Verify methods

const checkJwtToken = (req, res, next) => {
  let token = req.headers["authorization"];
  let method_id = req.headers["x-access-method"];
  token =
    token && token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : undefined;

  token && method_id
    ? (decode = getVerifyMethod(verifyJwtToken, { token, method_id }))
      ? ((req.headers.userrole = decode.userrole), next()) // ok and next()
      : res.status(status[401].code).json(
          createResponse("FAIL", {
            data: { message: "Auth token is invalid" },
          })
        )
    : res.status(status[401].code).json(
        createResponse("FAIL", {
          data: { message: "Auth token is required" },
        })
      );
};

const getVerifyMethod = (obj, { token, method_id }) => {
  const verifyJwtMethod = {
    one: () => obj.method_1(token),
    two: () => obj.method_2(token),
  };
  return verifyJwtMethod[method_id]();
};

const verifyJwtToken = {
  method_1: (token) =>
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      return err ? null : decode;
    }),
  method_2: (token) =>
    jwt.verify(token, publicKEY, signOption, (err, decode) => {
      return err ? null : decode;
    }),
};

// Authorized Methods

const isAuth = (target) => {
  return (req, res, next) => {
    const targetAccess = sumPermission(target);
    const permitAccess = sumPermission(req.headers.userrole);
    const prev = () => {
      res.status(status[401].code).json(
        createResponse("FAIL", {
          data: { message: "Auth permission is required" },
        })
      );
    };
    permitAccess >= targetAccess ? next() : prev();
  };
};

// Generate Route Token
router.post("/u-bar", GenerateToken);

module.exports = {
  isAuth: isAuth,
  tokenRouter: router,
  verifyToken: checkJwtToken,
  signToken_1: signJwtToken.method_1,
  signToken_2: signJwtToken.method_2,
};
