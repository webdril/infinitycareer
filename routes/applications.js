var express = require ("express");
var router = express.Router();
var Jobpost = require ("../models/jobpost");
var Application = require ("../models/application");
var isAuth = require("../isAuth");
var Employee = require ("../models/users/userTypes/employee");
// var isAuth = require("../isAuth");
// var isEmployer = require("../isEmployer");
// var Base = require("../models/users/config/Base");



router.get("/jobs/:id/applications/new", isAuth, (req, res) => {
    // find jobpost by id
    Jobpost.findById(req.params.id, (err, jobpost) => {
        if(err){
            console.log(err);
        } else{
            res.render("applications/new", {jobpost: jobpost});
        }
    })
});

router.post("/jobs/:id/applications", (req, res)=>{
    // look up job using id
    Jobpost.findById(req.params.id, (err, jobpost)=>{
        if(err){
            console.log(err);
             res.redirect("/jobs");
        } else{
            // create new application
            Application.create(req.body.application, (err, application)=>{
                if(err){
                    console.log(err)
                }  else {
                    // addFirstname and id to application
                    application.applicant.id = req.session.user._id;
                    application.applicant.firstname = req.session.user.firstname;
                    application.applicant.lastname = req.session.user.lastname;
                    application.applicant.email = req.session.user.email;
                    application.applicant.phone = req.session.user.phone;
                    application.applicant.dob = req.session.user.dob;
                    application.applicant.gender = req.session.user.gender;
                    application.applicant.country = req.session.user.country;
                    application.applicant.state = req.session.user.state;
                    application.applicant.city = req.session.user.city;
                    application.applicant.higherinstitution = req.session.user.higherinstitution;
                    application.applicant.graduatedyear = req.session.user.graduatedyear;
                    // then save application
                    application.save();
                    // Associate new application to jobpost
                    jobpost.applications.push(application);
                    // application.save();
                    jobpost.save();
                    // redirect to jobpost show page
                    // res.redirect("/jobs/" + jobpost._id);
                    res.redirect('/jobs/' + jobpost._id);
                }
            })
        }
    })
})


// Show all applications of an Employee

function getEmployeeJobApplication(firstname) {
	return Employee.findOne({firstname: firstname})
	  .populate("applications").exec((err, posts) =>{
        console.log("Populated Employee" + posts)
      }
	    
)
}






module.exports = router;