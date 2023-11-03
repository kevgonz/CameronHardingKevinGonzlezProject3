const model = require("../models/connection");

exports.index = (req, res) => {
  let connections = model.find();
  res.render("./connection/index", { connections });
};

exports.new = (req, res) => {
  res.render("./connection/new");
};

exports.create = (req, res) => {
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
  let id = req.params.id;
  let connection = model.findById(id);
  if (connection) {
    res.render("./connection/show", { connection });
  } else {
    let err = new Error("Cannot find a connection with id " + id);
    err.status = 404;
    next(err);
  }
};

exports.edit = (req, res, next) => {
  let id = req.params.id;
  let connection = model.findById(id);
  if (connection) {
    res.render("./connection/edit", { connection });
  } else {
    let err = new Error("Cannot find a connection with id " + id);
    err.status = 404;
    next(err);
  }
};

exports.update = (req, res, next) => {
  let connection = req.body;
  let id = req.params.id;

  if (model.updateById(id, connection)) {
    res.redirect("/connections/" + id);
  } else {
    let err = new Error("Cannot find a connection with id " + id);
    err.status = 404;
    next(err);
  }
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
