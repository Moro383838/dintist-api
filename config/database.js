const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");
const asyncHndler = require("express-async-handler");
const connectToDb = asyncHndler(async (req, res) => {
  await mongoose.connect(MONGODB_URI);
  console.log("MONGODB CONNECTED");
});
module.exports = {
  connectToDb,
};
