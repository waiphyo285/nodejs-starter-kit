module.exports = function (schema) {
  const creatState = function (next) {
    const self = this;
    const date = new Date();
    self.created_at = date;
    self.updated_at = date;
    next();
  };

  const updateState = function (next) {
    const self = this;
    const date = new Date();
    // work only as update state
    self._update.updated_at = date;
    next();
  };

  // update date for bellow 5 methods
  schema
    .pre("save", creatState)
    .pre("create", creatState)
    .pre("update", updateState)
    .pre("findOneAndUpdate", updateState)
    .pre("findByIdAndUpdate", updateState);
};
