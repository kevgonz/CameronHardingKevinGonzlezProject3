const User = require("../models/user");
const model = require("../models/user");
const Connection = require("../models/connection");

// view log in page (GETUSERLOGIN)
exports.login = (req, res) => {
  return res.render("./user/login");
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    else res.redirect("/");
  });
};

// render new account page (NEW)
exports.signup = (req, res) => {
  return res.render("./user/new");
};

// Sign up (CREATE)
exports.create = (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then(() => res.redirect("/user/login"))
    .catch((err) => {
      if (err.name === "ValidationError") {
        req.flash("error", err.message);
        return res.redirect("/user/new");
      }

      if (err.code === 11000) {
        req.flash("error", "Email adddress has been used");
        return res.redirect("/user/new");
      }
      next(err);
    });
};

// performs login operation(LOGIN)
exports.authenticate = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        user.comparePassword(password).then((result) => {
          if (result) {
            req.session.user = user._id;
            req.flash("success", "You have successfuly logged in");
            res.redirect("/user/profile");
          } else {
            req.flash("error", "Wrong Password!");
            res.redirect("/user/login");
          }
        });
      } else {
        req.flash("error", "Wrong Email Address!");
        res.redirect("/user/login");
      }
    })
    .catch((err) => next(err));
};

exports.profile = (req, res, next) => {
  let _id = req.session.user;
  Promise.all([model.findById(_id), Connection.find({ host: _id })])
    .then((results) => {
      const [user, connections] = results;
      res.render("./user/profile", { user, connections });
    })
    .catch((err) => next(err));
};
