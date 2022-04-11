const bcrypt = require("bcrypt");
const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

const Schema = mongoose.Schema;

const makeSchema = new Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  point: {
    type: Number,
    default: 100,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.pre("save", function (next) {
  passwordHashOnSave(this, next);
});

makeSchema.pre("findOneAndUpdate", function (next) {
  passwordHashOnUpdate(this, next);
});

makeSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(undefined, isMatch);
  });
};

// Remove password from the response
makeSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

makeSchema.plugin(SchemaPlugin);

const passwordHashOnSave = function (_this, next) {
  const user = _this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      // return next
      return next();
    });
  });
};

const passwordHashOnUpdate = function (_this, next) {
  const user = _this;
  const password = user.getUpdate().$set.password;
  if (!password) {
    return next();
  }
  try {
    // hash the password using our new salt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // override the cleartext password with the hashed one
    user.getUpdate().$set.password = hash;
    // return next
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = mongoose.model("register", makeSchema);
