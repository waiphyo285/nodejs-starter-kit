module.exports = function (schema) {
  var creatState = function (next) {
    var self = this;
    var date = new Date();

    self.created_at = date;
    self.updated_at = date;

    next();
  };

  var updateState = function (next) {
    var self = this;
    var date = new Date();

    // work only as update
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
