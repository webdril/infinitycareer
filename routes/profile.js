var express = require ("express");
var router = express.Router();
var Jobpost = require ("../models/jobpost")
var isAuth = require("../isAuth");
var Application = require ("../models/application");
var Base = require("../models/users/config/Base");
var Employer = require("../models/users/userTypes/employer");
var Employee = require("../models/users/userTypes/employee");
var async = require("async");


// Display an Employee profile
router.get("/employee/", (req, res) => {
    // var firstname= req.body.firstname;
    // var email = req.body.email;
    // var usertype = req.body.usertype;  
    Employee.findById(req.params.id, (err, foundemployee) =>{
        if(err){
            console.log(err);
        } 
         res.render("employee/show", {employee: foundemployee});
    });
    
});

// Show jobs applied by employee
// router.get("/application/appliedjobs", function(req, res){
//     Application.find({}, function(err, appliedjobs){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("employee/appliedjobs", {appliedjobs: appliedjobs});
//         }
//     });
// });

// Show all applications of an Employee
router.get("/employee/:id/applications", function(req, res){
    Employee.findById(req.params.id, (err, foundemployee) =>{
        Application.find().where("applicant.id").equals(foundemployee._id).exec(function(err, applications){
            if(err){

            }
            res.render("employee/appliedjobs", {employee: foundemployee, applications: applications});
        });
    });
});

// Display an Employer profile
router.get("/employer/:id", (req, res) => {
    // var firstname= req.body.firstname;
    // var email = req.body.email;
    // var usertype = req.body.usertype;  
    Employer.findById(req.params.id, (err, foundemployer) =>{
        
        Jobpost.find().where("owner.id").equals(foundemployer._id).exec(function(err, jobposts){
            if(err){
                        
        } 
        res.render("employer/show", {employer: foundemployer, jobposts: jobposts});
        });
         
    });
    
});



module.exports = router;