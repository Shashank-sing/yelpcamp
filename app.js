var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campgrounds.js"),
    Comment = require("./models/comments"),
    SeedDB = require("./seeds.js"),
    authRoutes = require("./routes/auth-routes"),
    expressSession = require("express-session"),
    User = require("./models/users.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require('passport-local-mongoose'),
    campgroundRoutes = require("./routes/campground-routes"),
    commentRoutes = require("./routes/comment-routes"),
    methodOverride = require("method-override"),
    flash = require("connect-flash")


    // mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    mongoose.connect("mongodb+srv://shashank:shashank@cluster0-vpgxb.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    
// SeedDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method")); 
app.use(flash());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

app.use(expressSession({
    secret:"My peepee Big",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user,
    res.locals.error = req.flash("error"),
    res.locals.success = req.flash("success")
    next();
})



app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



// comments route

app.listen(process.env.PORT || 8080, function () {
    console.log("YelpCamp server started");
}); 