const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  cityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
  },
  township_mm: {
    type: String,
  },
  township_en: {
    type: String,
  },
  code: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);

module.exports = mongoose.model("township", makeSchema);
