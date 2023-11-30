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
  //an object is a 24-bit Hex string
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid connection id");
    err.status = 400;
    return next(err);
  }
  //used to show to shpw the data from the user
  model
    .findById(_id)
    .then((connection) => {
      if (connection) {
        return res.render("./connection/show", { connection });
      } else {
        //error handling
        let err = new Error("Cannot find a connection with id " + _id);
        err.status = 404;
        next(err);
      }
    })
    //error handling
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
        //error handling
        let err = new Error("Cannot find a connection with id " + _id);
        err.status = 404;
        next(err);
      }
    })
    //error handling
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

  //calls method to update connection and sets editing validators
  model
    .findByIdAndUpdate(_id, connection, {
      useFindAndModify: false,
      runValidators: true,
    })
    .then((connection) => {
      if (connection) {
        res.redirect("/connections/" + _id);
      } else {
        //error handling
        let err = new Error("Cannot find a connection with id " + _id);
        err.status = 404;
        next(err);
      }
    })
    //error handling
    .catch((err) => {
      if (err.name === "ValidationError") err.status = 400;
      next(err);
    });
};

exports.delete = (req, res, next) => {
  let _id = req.params.id;

  //error handling
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid connection id");
    err.status = 400;
    return next(err);
  }

  model
    .findByIdAndDelete(_id, { useFindAndModify: false })
    .then((connection) => {
      if (connection) {
        res.redirect("/connections");
      } else {
        //error handling
        let err = new Error("Cannot find a connection with id " + id);
        err.status = 404;
        next(err);
      }
    })
    //error handling
    .catch((err) => next(err));
};

