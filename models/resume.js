var mongoose = require("mongoose");

const Base = require("../config/Base")

const Resume = Base.discriminator(
    "Resume",
    new mongoose.Schema({
        path: { type: String },
        caption: { type: String }
    })
);

module.exports = mongoose.model("Resume");

