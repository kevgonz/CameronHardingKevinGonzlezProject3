const Connection = require("../models/connection");

// check if user is a guest
exports.isGuest = (req, res, next) => {
  if (!req.session.user) return next();
  else {
    req.flash("error", "You are logged in already");
    return res.redirect("/user/profile");
  }
};

// check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) return next();
  else {
    req.flash("error", "You need to log in first");
    return res.redirect("/user/login");
  }
};

// check if user is author of the connection
exports.isHost = (req, res, next) => {
  let _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid connection id");
    err.status = 400;
    return next(err);
  }
  Connection.findById(_id)
    .then((connection) => {
      if (connection) {
        if (connection.host == req.session.user) {
          return next();
        } else {
          let err = new Error("Unauthorized to access the resource");
          err.status = 404;
          return next(err);
        }
      } else {
        let err = new Error("Cannot find connection with id " + _id);
        err.status = 400;
        next(err);
      }
    })
    .catch((err) => next(err));
};
