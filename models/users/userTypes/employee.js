var mongoose = require("mongoose");

const Base = require("../config/Base")

const Employee = Base.discriminator(
    "Employee",
    new mongoose.Schema({
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String },
        phone: { type: String },
        dob: { type: Date},
        gender: {type: String},
        country: { type: String },
        state: { type: String},
        city: { type: String},
        higherinstitution: { type: String },
        graduatedyear: { type: Date },
        appliedjobs: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Application"
                }
        ]
    })
);

module.exports = mongoose.model("Employee");