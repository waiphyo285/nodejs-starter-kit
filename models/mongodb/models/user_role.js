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
  program: [{
    menuid: {
      type: String,
      required: true
    },
    access: {
      type: Boolean,
      default: false,
    },
    submenu: [{
      menuid: {
        type: String,
        required: true
      },
      access: {
        type: Boolean,
        default: false,
      },
      read: {
        type: Boolean,
        default: false,
      },
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      }
    }]
  }],
  status: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

makeSchema.plugin(SchemaPlugin);

module.exports = mongoose.model("user_role", makeSchema);