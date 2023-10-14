const model = require("../models/connection");

exports.index = (req, res) => {
  let connections = model.find();
  res.render("./connection/index", { connections });
};

exports.new = (req, res) => {
  res.render("./connection/new");
};

exports.create = (req, res) => {
  let connection = req.body;
  model.save(connection);
  res.redirect("/connections");
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
