var router = require("express").Router({ mergeParams: true }),
    Campground = require("../models/campgrounds"),
    Comment = require("../models/comments"),
    middlewareObj = require("../middleware")


router.get("/new", middlewareObj.isLoggedIn, function (req, res) {

    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });

});

router.post("/", middlewareObj.isLoggedIn, function (req, res) {

    Comment.create({
        body: req.body.body,
    }, function (err, comment) {
        if (err) {
            console.log(err);
        } else {
            Campground.findById(req.params.id, function (err, article) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    article.comments.push(comment);
                    article.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });

});

router.get("/:comment_id/edit",middlewareObj.checkIfOwnerComment, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", { comment: comment, campground: campground });
                }
            })
        }
    })
})

router.put("/:comment_id",middlewareObj.checkIfOwnerComment, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, { body: req.body.body }, function (err, comment) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/:comment_id",middlewareObj.checkIfOwnerComment, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})





module.exports = router;
