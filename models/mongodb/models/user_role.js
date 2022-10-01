const mongoose = require("../connection");
const SchemaPlugin = require("./helpers/schema-plugin");

const Schema = mongoose.Schema;

// set properties
const makeSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  program: {
    menu: {
      type: Array,
      default: []
    },
    submenu: {
      type: Array,
      default: []
    }
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);

module.exports = mongoose.model("user_role", makeSchema);