var express = require ("express");
var router = express.Router();
var Jobpost = require ("../models/jobpost");
var Application = require ("../models/application");
var isAuth = require("../isAuth");
// var Employee = require ("../models/users/userTypes/employee");
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
                    // addusername and id to application
                    application.applicant.id = req.session.user._id;
                    application.applicant.firstname = req.session.user.firstname;
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

// router.get("/applications", (req, res) => {

// });


module.exports = router;