const mongoose = require("mongoose");
const config = require("../../config");
const clr = require("../../helpers/config/log_color");

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

// Set environment variables
const env = config.NODE_ENV || "development";
const host = config.MONGO.HOST || "localhost";
const port = config.MONGO.PORT || 27017;
const user = config.MONGO.USER || "root";
const pass = config.MONGO.PASS || "no-pass";
const database = config.APP.DATABASE || "it_backend_uat";

const connect_urls = {
  production: `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=admin`,
  development: `mongodb://${host}:${port}/${database}`,
};

// Create connection
mongoose.connect(connect_urls[env]);

// Signal connection
mongoose.connection
  .once("open", function () {
    console.log(`${clr.fg.magenta}Database: 😃 MongoDB is connected!`);
  })
  .on("error", function (error) {
    console.log(`${clr.fg.red}Database: 😡 MongoDB connection error`, error);
  })
  .on("disconnected", function () {
    console.log(`${clr.fg.yellow} Database: 😡 MongoDB is disconnected`);
  });

module.exports = mongoose;
