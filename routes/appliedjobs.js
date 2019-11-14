var express = require ("express");
var router = express.Router();
var Jobpost = require ("../models/jobpost");
var isAuth = require("../isAuth");
var Application = require ("../models/application");



router.get("/jobs/:id/applications/", isAuth, (req, res) => {
    // find jobpost by id
    Jobpost.findById(req.params.id, (err, jobpost) => {
        if(err){
            console.log(err);
        } else{
            res.render("appliedjobs/show",{job: foundJob}); 
        }
    })
});