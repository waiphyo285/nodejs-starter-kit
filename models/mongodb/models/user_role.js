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
      actions: {
        type: String,
        default: "0,0,0"
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