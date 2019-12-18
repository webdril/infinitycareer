var mongoose = require("mongoose");
var applicationSchema = new mongoose.Schema({
    text: String,
    applicant: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },
        firstname: String,
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
       
    }, 
    appliedjob: {
        id:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "Jobpost"
            },
            title: String
    }
});

module.exports = mongoose.model("Application", applicationSchema);