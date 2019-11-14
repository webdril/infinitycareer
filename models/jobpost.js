var mongoose = require("mongoose");
var jobpostSchema = new mongoose.Schema({
    title: String,
    type: String,
    location: String,
    salary: String,
    department: String,
    description: String,
    owner:{
       id:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employer"
       },
       companyname: String
    },
    applications: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Application",
            firstname: "req.session.user.firstname"
        }
        
    ]
});

module.exports = mongoose.model("Jobpost", jobpostSchema);