var express = require ("express");
var router = express.Router();
var Jobpost = require ("../models/jobpost")
var isAuth = require("../isAuth");
var isEmployer = require("../isEmployer");
var Base = require("../models/users/config/Base");




// Create - add new jobpost to DB

router.post("/jobs", isAuth, function(req, res){
    // get data from form and add to job array
    var title = req.body.title;
    var type = req.body.type;
    var location = req.body.location;
    var salary = req.body.salary;
    var department = req.body.department;
    var description = req.body.description;
    var owner = {
        id: req.session.user._id,
        companyname: req.session.user.companyname
    }
    // Remove the below later
    // jobpost.owner.id = req.session.user._id;
    // jobpost.owner.companyname = req.session.user.companyname;

                
    
    var newJob = {title: title, type: type, location: location, salary: salary, department: department, description: description, owner: owner}

    // Create a new Jobpost and save to Db
    Jobpost.create(newJob, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            // newlyCreated.owner.id = req.session.user._id;
            // newlyCreated.owner.companyname = req.session.user.companyname;
            res.redirect("/jobs");
        }
    });
});

// Show all JobPosts from Db
router.get("/jobs", function(req, res){
    Jobpost.find({})
    .sort({"title": -1})
    .limit(5)

    .exec(function(err, alljobs){
        if(err){
            console.log(err)
        } else {
            res.render("jobs/index", {jobs: alljobs});
            
        }
    });
});

router.get("/jobs/new", isAuth, function(req, res){
    let usertype = req.session.user.usertype;
    if(usertype == "Employee"){
       
        return res.redirect("back");
    }
    res.render("jobs/new");
    
})


//Show more info about one jobpost
router.get("/jobs/:id", function(req, res){
    Jobpost.findById(req.params.id).populate("applications").exec(function(err, foundJob){
        if(err){
            console.log(err);
            
        } else{
           res.render("jobs/show",{job: foundJob}); 
        }
    });
    
});

//Show all jobpost of an Employer
router.get("/myjob/jobs", isAuth, function(req, res){
    let usertype = req.session.user.usertype;
    if(usertype == "Employee"){
       
        return res.redirect("back");
    }
    
    Jobpost.find( { owner: req.session.user._id } )
           .exec(function (err, alljobs) {
            if (err) return handledError(err);
            res.render("myjob/jobs/show", {jobs: alljobs});
           })
    })
    // res.render("jobs/myjobs");
    // Jobpost.find({})
    // .sort({"createdAt": -1})
    // .limit(10)

    // .exec(function(err, alljobs){
    //     if(err){
    //         console.log(err)
    //     } else {
    //         res.render("jobs/index", {jobs: alljobs});
            
    //     }
    // });
// });

//Show more info about one jobpost and its Applicants
router.get("/myjob/jobs/:id", isAuth, function(req, res){
    let usertype = req.session.user.usertype;
    if(usertype == "Employer"){
        Jobpost.findById(req.params.id).populate("applications").exec(function(err, foundJob){
            if(err){
                console.log(err);
                
            } else{
            res.render("jobs/show",{job: foundJob}); 
            }
        });
    }
    else{
       return res.redirect("back");
    }
    
});





module.exports = router;
// function isLoggedIn(req, res, next){
//     if(isAuth()){
//         return next();
//     }
//     res.redirect("/login");
// }