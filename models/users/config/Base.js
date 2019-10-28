const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: "usertype",
  collection: "users"
};

// Our Base schema: these properties will be shared with our "real" schemas
const Base = mongoose.model(
  "Base",
  new mongoose.Schema(
    {
      email: { type: String, required: true },
      password: { type: String, required: true }
      
    },
    baseOptions,
  ),
);

module.exports = mongoose.model("Base");
