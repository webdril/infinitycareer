const mongoose = require("mongoose");

const Base = require("../config/Base")

const Employer = Base.discriminator(
  "Employer",
  new mongoose.Schema({
    companyname: {type: String },
    email: {type: String },
    companyaddress: {type: String },
    companyphonenumber: {type: Number },
    companycountry: {type: String },
    companystate: {type: String },
    companycity: {type: String },
    jobposts: [
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Jobpost"
       }

    ]
  })
)

module.exports = mongoose.model("Employer");