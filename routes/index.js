var express = require("express");
var router = express.Router();
var Employer = require("../models/users/userTypes/employer");
var Employee = require("../models/users/userTypes/employee");
var Base = require("../models/users/config/Base");
var bcrypt = require("bcryptjs");
var isAuth = require("../isAuth");
// var multer = require("multer");



// // Multer setups, storage
// var storage = multer.diskStorage({
//     destination: function (req, file, callback){
//       callback(null, "./public/files");
//     },
//     filename: function(req, file, callback) {
//       callback(null, file.fieldname + "-" + Date.now());
//     }
//   });
  
//   // Upload Setup
//   var upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 3000000
//     }
//   }).single("resume");



router.get("/", function (req, res) {
    res.render("landing");
});

// ------------------
// AUTH ROUTES
// ------------------

// Show employee register form
router.get("/employee/register", function (req, res) {
    res.render("employee/register");
})

// Signup Logic
router.post("/employee/register", function (req, res) {
    console.log(req.body);
    let { firstname, lastname, email, password, country, state, city, phone, gender, dob, higherinstitution, resume  } = req.body;
    Base.findOne({ email: email }).then(founduser => {
        if (founduser) {
            return res.redirect("/login")
            console.log("The email " + founduser + " is already registered");
        }
        return bcrypt.hash(password, 12)
    }).then(hashedpwd => {
        // if (hashedpwd) {
                const newUser = new Employee({
                    firstname,
                    lastname,
                    email,
                    password: hashedpwd,
                    country,
                    state,
                    city,
                    phone,
                    gender,
                    dob,
                    higherinstitution,
                    resume
                });
                newUser.save().then(newUser => {
                    return res.redirect("/login");
                });
    })
});


// Show Employer Register Form
router.get("/employer/register", function (req, res) {
    res.render("employer/register");
})


// SignUp Logic for Employer
router.post("/employer/register", function (req, res) {
    console.log(req.body);
    let { companyname, companyaddress, email, password, companycountry, companystate, companycity, companyphone  } = req.body;
    Base.findOne({ email: email }).then(founduser => {
        if (founduser) {
            return res.redirect("/login")
            console.log("The email " + founduser + " is already registered");
        }
        return bcrypt.hash(password, 12)
    }).then(hashedpwd => {
            console.log(hashedpwd);
                const newUser = new Employer({
                    companyname,
                    companyaddress,
                    email,
                    password: hashedpwd,
                    companycountry,
                    companystate,
                    companycity,
                    companyphone
                   
                })
                newUser.save().then(newUser => {
                    return res.redirect("/login");
                })
            
       
    })
});






//  Show Employee login form
router.get("/login", function (req, res) {
    res.render("login");
})

// Hnadling login logic
router.post("/login",  async (req, res) => {
    let { email, password } = req.body;
    let founduser = await Base.findOne({ email: email })
    if (!founduser) {
        // if user not found
        return res.redirect("/employee/register")
    }
    let isMatch = await bcrypt.compare(password.toString(), founduser.password)
    if (!isMatch) {
        return res.redirect("back")
    } else {
        req.session.isLoggedIn = true;
        req.session.user = founduser;
        try {
            await req.session.save();
        } catch(err) {
            console.log(err);
        }
        res.redirect("/jobs")
    } 
});



router.get("/logout", async (req, res) => {
    await req.session.destroy()
    return res.redirect("/jobs")
})





module.exports = router;

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login")
// }
