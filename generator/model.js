const mongoose = require("../connection");
const SchemaPlugin = require("@helpers/schema-plugin");

const Schema = mongoose.Schema;

// set properties
const makeSchema = new Schema();

makeSchema.plugin(SchemaPlugin);

module.exports = mongoose.model("generator", makeSchema);
