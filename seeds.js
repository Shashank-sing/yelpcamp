var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds.js"),
    Comment = require("./models/comments.js");

var data = [{
    name: "Mesa",
    image: "c1.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}, {
    name: "Plains",
    image: "c2.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}, {
    name: "Desert",
    image: "c3.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}];

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err) {
            console.log(err);   
        }
        console.log("Campgrounds Removed");
        data.forEach(function(camp) {
            Campground.create(camp, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Campground Added");
                    Comment.create({
                        body: "I like to Camp anywhere",
                        author: {
                            username: "Mike Kruskal"
                        }
                    }, function(err, Comment) {
                        campground.comments.push(Comment);
                        campground.save();
                    })
                }
            })
        })
    })
}

module.exports = seedDB;