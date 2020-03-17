var router = require("express").Router(),
    Campground = require("../models/campgrounds"),
    middleware = require("../middleware");


router.get("/", function (req, res) {

    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("An error Occured");
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    })
});

router.post("/",middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var camp = {
        name: name,
        image: image, 
        desc: desc,
        author: {
            id: req.user.id,
            username: req.user.username
        } 
    };

    Campground.create(camp, function (err, campgrounds) {
        if (err) {
            console.log("An error Occured");
        } else {
            res.redirect("/campgrounds");
        }
    })

});

router.get("/new",middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("Can't get show page" + err);
        } else {
            res.render("campgrounds/show", { campground: campground });
        }
    });

});


router.get("/:id/edit", middleware.checkIfOwnerCampground, function(req, res){

    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/edit",{campground: campground});
        }
    })
})

router.put("/:id",middleware.checkIfOwnerCampground ,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/:id", middleware.checkIfOwnerCampground, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campground/" + req.params.id);
        } else {
            res.redirect("/campgrounds");
        }
    })
})




module.exports = router;