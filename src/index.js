const express = require("express");
const methodOverride = require("method-override");
const exhbs = require("express-handlebars");
const path = require("path");
const user = require("./routes/user");
const index = require("./routes/index");
const vehicles = require("./routes/vehicles");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require('passport');
const flash = require('connect-flash');


dotenv.config();
require('./config/passport');

//database connection
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to DB");
  }
);

// settings
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exhbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Middelwares
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "vehiculos-app",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

//Routes
app.use("/", index);
app.use("/user", user);
app.use("/vehicle", vehicles);

//static resources

app.use(express.static(path.join(__dirname, "public")));

//server

app.listen(process.env.PORT || 8080, () => {
  console.log("Server up and running...");
});
