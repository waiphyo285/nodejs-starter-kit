const bcrypt = require("bcrypt");
const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  theme: {
    type: String,
    default: "default",
  },
  latmat: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);

makeSchema.pre("save", function (next) {
  const _ = this;
  return generatePassword(_, next)
});

makeSchema.pre("findOneAndUpdate", function (next) {
  const _ = this.getUpdate();
  return generatePassword(_, next)
});

makeSchema.methods.comparePassword = function (candidatePass, cb) {
  const _ = this;
  const callBack = (err, isMatch) => err ? cb(err) : cb(null, isMatch);
  bcrypt.compare(candidatePass, _.password, callBack)
};

const generatePassword = (_, next) => {
  const callNext = (res) => next(res);
  const userPass = (hash) => (_.password = hash, callNext());
  const checkErr = (err, val, fn) => (err ? callNext(err) : fn(val));
  const hashPass = (salt) => bcrypt.hash(_.password, salt, (err, hash) => checkErr(err, hash, userPass));
  const checkHash = (round) => bcrypt.genSalt(round, (err, salt) => checkErr(err, salt, hashPass));
  const checkPass = (pass, fn) => (!pass ? callNext() : fn(10));
  return checkPass(_.password, checkHash);
}

const User = mongoose.model("user", makeSchema);

module.exports = User;
