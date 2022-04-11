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
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      // next function
      return next();
    });
  });
});

makeSchema.pre("findOneAndUpdate", function (next) {
  const user = this;
  const password = user.getUpdate().password;

  if (!password) return next();

  try {
    // hash the password using our new salt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // override the cleartext password with the hashed one
    user.getUpdate().password = hash;
    // next function
    return next();
  } catch (error) {
    return next(error);
  }
});

makeSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("user", makeSchema);

module.exports = User;
