const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
const handle_tz = require("./handle_timezone");

/**
 * Utils Functions
 */

/* Helper Methods */
module.exports.isEmpty = function (obj) {
  if (typeof obj === "undefined") return true;
  if (obj === null) return true;
  if (typeof obj === "string" && obj === "") return true;
  if (typeof obj === "number" && obj === 0) return true;
  return false;
};

module.exports.isEmptyObject = function (obj) {
  if (typeof obj !== "object") return true;
  if (obj === null) return true;
  return false;
};

module.exports.isEmptyArray = function (arr) {
  if (typeof arr !== "object") return true;
  if (arr === null) return true;
  if (!Array.isArray(arr)) return true;
  if (arr.length < 1) return true;
  return false;
};

module.exports.isEmptyString = function (str) {
  if (typeof str !== "string") return true;
  if (str === "") return true;
  return false;
};

module.exports.isEmptyNumber = function (num) {
  if (typeof num !== "number") return true;
  if (num === 0) return true;
  return false;
};

module.exports.isArray = function (arr) {
  if (typeof arr !== "object") return false;
  if (arr === null) return false;
  return Array.isArray(arr);
};

module.exports.isEmail = function (email) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email
  );
};

module.exports.hasKey = function (obj, key) {
  if (typeof obj !== "object") return false;
  if (obj === null) return false;

  if (typeof key === "undefined") return false;
  if (key === null) return false;
  if (typeof key === "string" && key === "") return false;

  return typeof obj[key] !== "undefined";
};

module.exports.hasValNotEmpty = function (obj, key) {
  if (typeof obj !== "object") return false;
  if (obj === null) return false;

  if (typeof key === "undefined") return false;
  if (key === null) return false;
  if (typeof key === "string" && key === "") return false;

  if (typeof obj[key] === "undefined") return false;
  if (obj[key] === null) return false;
  if (typeof obj[key] === "string" && obj[key] === "") return false;
  if (typeof obj[key] === "number" && obj[key] === 0) return false;

  return true;
};

/* Date Methods */

module.exports.getTimeZone = async function (utc = "+06:30") {
  const timezone = handle_tz.find((tz, idx) => tz.utc === utc);
  return timezone;
};

module.exports.urlDecode = function (text) {
  if (text == "") return text;
  var exps = [
    /%0A/g,
    /%0D/g,
    /%20/g,
    /%23/g,
    /%24/g,
    /%25/g,
    /%26/g,
    /%2B/g,
    /%2C/g,
    /%2F/g,
    /%3A/g,
    /%3B/g,
    /%3D/g,
    /%3F/g,
    /%40/g,
    /%5B/g,
    /%5D/g,
    /%22/g,
    /%3C/g,
    /%3E/g,
    /%5E/g,
    /%60/g,
    /%7B/g,
    /%7C/g,
    /%7D/g,
  ];
  for (var i in exps) {
    text = text.replace(exps[i], function (x) {
      x = x.substr(1);
      return String.fromCharCode(parseInt(x, 16));
    });
  }
  return text;
};

module.exports.urlEncode = function (text) {
  if (text == "") return text;
  // \s\n\r!#$%&'\(\)\*\+,/:;=\?@\[\]\"\-.<>\\^_`\{|\}~
  return text
    .replace(/%/g, "%25")
    .replace(/\n/g, "%0A")
    .replace(/\r/g, "%0D")
    .replace(/\s/g, "%20")
    .replace(/[#$&\+,/:;=\?@\[\]\"<>\\^`\{|\}]/g, function (x) {
      return "%" + x.charCodeAt(0).toString(16).toUpperCase();
    });
};

/**
 * Generates a MongoDB-style ObjectId in Node.js. Uses nanosecond timestamp in place of counter;
 * should be impossible for same process to generate multiple objectId in same nanosecond? (clock
 * drift can result in an *extremely* remote possibility of id conflicts).
 *
 * @returns {string} Id in same format as MongoDB ObjectId.
 */
module.exports.objectId = function () {
  const seconds = Math.floor(new Date() / 1000).toString(16);
  const machineId = crypto
    .createHash("md5")
    .update(os.hostname())
    .digest("hex")
    .slice(0, 6);

  const processId = process.pid.toString(16).slice(0, 4).padStart(4, "0");
  const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, "0");

  return seconds + machineId + processId + counter;
};

module.exports.nFormatter = function (num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

module.exports.toCamelCase = function (str) {
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
};

module.exports.toTitleCase = function (str, splitWith, joinWith) {
  return str
    .split(splitWith)
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(joinWith);
};

module.exports.removeImages = function (remove_images) {
  let canDelete = true;
  return new Promise((resolve, reject) => {
    if (remove_images && remove_images.length > 0) {
      remove_images.map((file, Idx) => {
        fs.unlink("./public" + file.replace(/\\/g, "/"), (err) => {
          if (err) console.error("File ", err), (canDelete = false);
          else console.log(`File ${file} is removed`), (canDelete = true);
        });
      });
      canDelete ? resolve() : reject();
    }
  });
};
