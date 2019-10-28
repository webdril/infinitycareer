var express = require ("express");
var router = express.Router();
var Jobpost = require ("../models/jobpost")
var isAuth = require("../isAuth");
var Base = require("../models/users/config/Base");
var Employer = require("../models/users/userTypes/employer");
var Employee = require("../models/users/userTypes/employee");



// Display an Employee profile
router.get("/employee", (req, res) => {
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

// Display an Employer profile
router.get("/employer", (req, res) => {
    // var firstname= req.body.firstname;
    // var email = req.body.email;
    // var usertype = req.body.usertype;  
    Employer.findById(req.params.id, (err, foundemployer) =>{
        if(err){
            console.log(err);
        } 
         res.render("employer/show", {employer: foundemployer});
    });
    
});







module.exports = router;