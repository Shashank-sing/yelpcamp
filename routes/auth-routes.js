var router = require("express").Router(),
    User = require("../models/users.js"),
    passport = require("passport")

router.get("/", function (req, res) {
    res.render("landing");
});


router.get("/register", function (req, res) {
    res.render("auth/signUp.ejs")
})

router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);  
            return res.redirect("/register");
        } else {

            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Hello! You are logged in as" + req.body.username)
                res.redirect("/");
            });
        }
    });
})


router.get("/login", function (req, res) {
    res.render("auth/login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
}));

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You are successfully logged out");
    res.redirect("/");
})


module.exports = router;