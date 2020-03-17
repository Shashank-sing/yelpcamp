var Comment = require("../models/comments"),
    Campground = require("../models/campgrounds");


var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You have to be logged in first");
        res.redirect("/login");
    }
}

middlewareObj.checkIfOwnerComment = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (comment.author.id.equals(req.user.id)) {
                req.flash("success", "You have successfully created a comment!")
                next();
            } else {
                req.flash("error", "This is not your comment");
                res.redirect("back");
            }
        })
    } else {
        req.flash("error", "You have to be logged in first");
        res.redirect("/login");
    }
}

middlewareObj.checkIfOwnerCampground = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground){
            if(campground.author.id.equals(req.user.id)) {
                req.flash("success", "You have successfully created a campground!")
                next();
            } else {
                req.flash("error", "This is not your campground");
                res.redirect("back");
            }
        })
    } else {
        req.flash("error", "You have to be logged in first");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;