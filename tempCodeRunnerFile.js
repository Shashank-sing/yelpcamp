app.use(expressSession({
    secret: "My peepee Big",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());