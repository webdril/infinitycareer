module.exports = (req, res, next) => {
    
    if(!req.session.user.usertype == "Employer"){
       
        return res.redirect("/jobs");
    }
    next();
};