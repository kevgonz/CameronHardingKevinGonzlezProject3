//require modules
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const connectionRoutes = require("./routes/connectionRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require('./models/user');
const path = require("path");

//create app
const app = express();

//configure app
let port = 3000;
let host = "localhost";
let url = "mongodb://127.0.0.1:27017/NBAD";
app.set("view engine", "ejs");

//Connect to mongoDB
mongoose
  .connect(url)
  .then(() => {
    //start server
    app.listen(port, host, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => console.log(err.message));

//mount middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.use(session({
  secret: 'gjdfakslgjoipagjkla',
  resave: false,
  saveUninitialized: false,
  cookie:{maxAge: 60*60*1000},
  store: new MongoStore({mongoUrl: url})
}));

app.use(flash());

app.use((req,res,next)=>{
  console.log(req.session);
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});

//setup routes
app.get("/", (req, res) => {
  res.render("index");
});


app.use("/user", userRoutes);
app.use("/connections", connectionRoutes);

app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  res.status(err.status);
  res.render("error", { error: err });
});
