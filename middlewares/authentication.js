const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/settings/auth");
const { createResponse } = require("../helpers/handlers/create_response");

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
const sumPermission = (role) => {
  return config.userRoleAccess[role]
    .split(",")
    .reduce((sum, cur) => +sum + +cur, 0);
}

// Generate methods

const encryptTime = (req, res) => {
  const time = encryptData(`${Date.now()}`)
  const locales = res.locals.i18n.translations;
  checkPayload(req.body)
    ? res.status(200).json(
      createResponse(200, { data: { data: time } }, locales)
    )
    : res.status(401).json(
      createResponse(401, {}, locales)
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
  const token = getSignMethod(signJwtToken, req.body);
  const locales = res.locals.i18n.translations;

  datetime - prevtime <= 60000 && checkPayload(req.body)
    ? res.status(200).json(
      createResponse(200, { data: { token } }, locales)
    )
    : res.status(401).json(
      createResponse(401, {}, locales)
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
  method_1: (payload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry });
  },
  method_2: (payload) => {
    return jwt.sign(payload, privateKey, config.signOption);
  },
};

// Verify methods

const checkJwtToken = (req, res, next) => {
  let token = req.headers["authorization"];
  let method_id = req.headers["x-access-method"];
  const locales = res.locals.i18n.translations;

  token =
    token && token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : undefined;

  token && method_id
    ? (decode = getVerifyMethod(verifyJwtToken, { token, method_id }))
      ? ((req.headers.userrole = decode.userrole), next()) // ok
      : res.status(401).json(createResponse(401, {}, locales))
    : res.status(401).json(createResponse(401, {}, locales));
};

const getVerifyMethod = (obj, { token, method_id }) => {
  const verifyJwtMethod = {
    one: () => obj.method_1(token),
    two: () => obj.method_2(token),
  };
  return verifyJwtMethod[method_id]();
};

const verifyJwtToken = {
  method_1: (token) => {
    return jwt.verify(token, config.jwtSecret, (err, decode) =>
      err ? null : decode
    );
  },
  method_2: (token) => {
    return jwt.verify(token, publicKey, config.signOption, (err, decode) =>
      err ? null : decode
    );
  },
};

// Authorized Methods

const isAuth = (targets) => {
  return (req, res, next) => {
    const curRole = req.headers.userrole;
    const locales = res.locals.i18n.translations;
    const curTarget = targets.find((target) => target == curRole);
    const targetAccess = sumPermission(curTarget || "developer");
    const permitAccess = sumPermission(curRole);
    const prev = () => {
      res.status(401).json(createResponse(401, {}, locales));
    }
    permitAccess >= targetAccess ? next() : prev();
  };
};

// Generate Token Routes
router.post("/u-tsh/", encryptTime);
router.post("/u-bar/:timehash?", generateToken);

module.exports = {
  isAuth: isAuth,
  tokenRouter: router,
  verifyToken: checkJwtToken,
  signToken_1: signJwtToken.method_1, // dashboard user lamat
  signToken_2: signJwtToken.method_2, // explore api to other
};
