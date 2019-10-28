module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        req.session.save();
        return res.redirect("/login");
    }
    next();
};
