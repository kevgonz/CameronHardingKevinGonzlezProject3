const model = require("../models/connection");

exports.index = (req, res, next) => {
  model
    .find()
    .then((connections) => res.render("./connection/index", { connections }))
    .catch((err) => next(err));
};

exports.about = (req, res) => {
  res.render("about");
};

exports.contact = (req, res) => {
  res.render("contact");
};

exports.new = (req, res) => {
  res.render("./connection/new");
};

exports.create = (req, res, next) => {
  //res.send('Created a new connection');
  let connection = new model(req.body); //create a new connection document
  connection
    .save() //insert the document to the database
    .then((connection) => res.redirect("/connections"))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

exports.show = (req, res, next) => {
  let _id = req.params.id;

  model
    .findById(_id)
    .then((connection) => {
      if (connection) {
        return res.render("./connection/show", { connection });
      } else {
        let err = new Error("Cannot find a connection with id " + _id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

exports.edit = (req, res, next) => {
  let _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid connection id");
    err.status = 400;
    return next(err);
  }
  model
    .findById(_id)
    .then((connection) => {
      if (connection) {
        return res.render("./connection/edit", { connection });
      } else {
        let err = new Error("Cannot find a connection with id " + _id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  let connection = req.body;
  let _id = req.params.id;

  //checks if story is valid
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid connection id");
    err.status = 400;
    return next(err);
  }
  model
    .findByIdAndUpdate(_id, connection)
    .then((connection) => {
      if (connection) {
        res.redirect("/connections/" + _id);
      } else {
        let err = new Error("Cannot find a connection with id " + _id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)) {
    res.redirect("/connections");
  } else {
    let err = new Error("Cannot find a connection with id " + id);
    err.status = 404;
    next(err);
  }
};
