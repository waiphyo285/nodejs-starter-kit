const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("./auth_config");
const { status, createResponse } = require("../helpers/handle_response");

// use 'utf8' to get string instead of byte array  (512 bit key)
const publicKey = fs.readFileSync(
  path.join(__dirname, "../config/rsa-ssh/public.key"),
  { encoding: "utf-8" }
);

const privateKey = fs.readFileSync(
  path.join(__dirname, "../config/rsa-ssh/private.key"),
  { encoding: "utf-8" }
);

// Compare permssion
const sumPermission = (role) =>
  config.userRoleAccess[role].split(",").reduce((sum, cur) => +sum + +cur, 0);

// Generate methods

const encryptTime = (req, res) => {
  checkPayload(req.body)
    ? res.status(status[200].code).json(
      createResponse("SUCCESS", {
        data: { data: encryptData(`${Date.now()}`) },
      })
    )
    : res.status(status[401].code).json(
      createResponse("FAIL", {
        data: { message: "Encrypted time is failed" },
      })
    );
};

const encryptData = (message) => {
  const algorithm = config.encodeAlg;
  const initVectr = crypto.randomBytes(16);
  const secretKey = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, secretKey, initVectr);
  return {
    init_vectr: initVectr.toString("base64"),
    secret_key: secretKey.toString("base64"),
    random: cipher.update(message, "utf-8", "hex") + cipher.final("hex"),
  };
};

const decryptData = ({ init_vectr, secret_key, random }) => {
  const algorithm = config.encodeAlg;
  const initVectr = Buffer.from(init_vectr, "base64");
  const secretKey = Buffer.from(secret_key, "base64");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, initVectr);
  return decipher.update(random, "hex", "utf-8") + decipher.final("utf8");
};

const generateToken = (req, res) => {
  // 1 min = 60000 ms
  const datetime = Date.now();
  const hashprop = req.params.timehash;
  const prevtime = decryptData({ ...req.body, random: hashprop });
  datetime - prevtime <= 60000 && checkPayload(req.body)
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
    config.defineUserRole.indexOf(userrole) !== -1 &&
    config.mockedUsername === username &&
    config.mockedPassword === password &&
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
    jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry }),
  method_2: (payload) => jwt.sign(payload, privateKey, config.signOption),
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
    jwt.verify(token, config.jwtSecret, (err, decode) => (err ? null : decode)),
  method_2: (token) =>
    jwt.verify(token, publicKey, config.signOption, (err, decode) =>
      err ? null : decode
    ),
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
router.post("/u-tsh/", encryptTime);
router.post("/u-bar/:timehash?", generateToken);

module.exports = {
  isAuth: isAuth,
  tokenRouter: router,
  verifyToken: checkJwtToken,
  signToken_1: signJwtToken.method_1,
  signToken_2: signJwtToken.method_2,
};
