var mongoose = require("mongoose");
var jobpostSchema = new mongoose.Schema({
    title: String,
    type: String,
    location: String,
    salary: String,
    department: String,
    description: String,
    author:{
       id:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employer"
       },
       username: String
    },
    applications: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Application"
        }
    ]
});

module.exports = mongoose.model("Jobpost", jobpostSchema);