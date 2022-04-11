const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

const Schema = mongoose.Schema;
const makeSchema = new Schema({
  city_mm: {
    type: String,
  },
  city_en: {
    type: String,
  },
  code: {
    type: String,
  },
  unit: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);
const City = mongoose.model("city", makeSchema);

module.exports = City;
