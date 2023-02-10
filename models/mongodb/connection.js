const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const config = require("@config");
const clr = require("@helpers/config/log_color");

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
const database = config.APP.DATABASE || "hyper_pos_v1";

let connect_urls = {
  development: `mongodb://${host}:${port}/${database}`,
  production: `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=admin`,
};

const checkTesting = async () => {
  if (env === "testing") {
    const memoryServer = await MongoMemoryServer.create({
      instance: {
        dbName: database,
      },
    });
    connect_urls = {
      ...connect_urls,
      [env]: memoryServer.getUri(),
    };
  }
};

// Create connection
const dbConnect = async (checkTestingFn) => {
  await checkTestingFn();
  await mongoose.connect(connect_urls[env]);
};

// Remove connection
const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

// Init connection
dbConnect(checkTesting);

// Signal connection
mongoose.connection
  .once("open", function () {
    console.log(`${clr.fg.magenta}Database: 😃 MongoDB (${env}) is connected!`);
  })
  .on("error", function (error) {
    console.log(`${clr.fg.red}Database: 😡 MongoDB connection error`, error);
  })
  .on("disconnected", function () {
    console.log(`${clr.fg.yellow} Database: 😡 MongoDB is disconnected`);
  });

module.exports = { mongoose, dbConnect, dbDisconnect };
