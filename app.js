var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var bcrypt = require("bcryptjs");
var multer = require("multer");
var upload = multer();
var esession = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(esession)
var mongoose = require("mongoose");
var methodOverride = require("method-override");


var URI = "mongodb://localhost/jober";
// var passport = require("passport");
// var LocalSrategy = require("passport-local");
var methodOverride = require("method-override");
var Employer = require("./models/users/userTypes/employer");
var Employee = require("./models/users/userTypes/employee");
var Base = require("./models/users/config/Base");
// var User = require("./models/user");



// Requiring Routes
var indexRoutes = require("./routes/index"),
     jobdRoutes = require("./routes/jobposts"),
     profileRoutes = require("./routes/profile"),
    applicationRoutes = require("./routes/applications");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// Multer setups, storage
var storage = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, "./public/files");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  }
});

// Upload Setup
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000
  }
}).single("resume");

// for parsing multipart/form-data
// app.use(upload.array()); 
app.use(express.static(__dirname + '/public'));


const store = new mongoDBStore({
  uri: URI,
  collection: "sessions"
})
// Authentication

app.use(esession({
  secret: "Meet me at the other side of the room",
  resave: false,
  saveUninitialized: false
}));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalSrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.use(new LocalSrategy(Employer.authenticate()));
// passport.serializeUser(Employer.serializeUser());
// passport.deserializeUser(Employer.deserializeUser());

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn
    res.locals.user = req.session.user
    //res.locals.usertype = req.session.usertype
  
    // console.log(req.session.user) this will display a users section in console, which will comprise of all the users details
    next();
});




app.use(indexRoutes);
app.use(jobdRoutes);
app.use(profileRoutes);
app.use(applicationRoutes);

mongoose.Promise = global.Promise;
mongoose.connect(URI, {useNewUrlParser: true})
.then(() => console.log("mongoDB Connected"))
.catch(err => console.log(err))



app.listen(2000, () => {
    console.log("Express is running on port");
});