var mongoose = require("mongoose");
var applicationSchema = new mongoose.Schema({
    text: String,
    applicant: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },
        firstname: String
    }
});

module.exports = mongoose.model("Application", applicationSchema);