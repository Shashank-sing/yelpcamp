var mongoose = require("mongoose"),
    Comment = require("./comments.js"),
    User = require("./users.js")

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Campground", campSchema);



