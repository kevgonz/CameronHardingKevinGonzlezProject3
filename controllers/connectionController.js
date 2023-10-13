const model = require('../models/connection');


exports.index = (req, res)=> {
    let connections = model.find();
    res.render('./connection/index', {connections});
};

exports.new = (req, res)=> {
    res.render('./connection/new');
};

exports.create = (req, res)=> {
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};

exports.show = (req, res)=> {
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        res.render('./connection/show', {connection});
    }else {
        res.status(404).send('Cannot find connection with ' + id);
    }
};

exports.edit = (req, res)=> {
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        res.render('./connection/edit', {connection});
    }else {
        res.status(404).send('Cannot find connection with ' + id);
    }
};

exports.update = (req, res)=> {
   let connection = req.body;
   let id = req.params.id;

   if(model.updateById(id, connection)){
        res.redirect('/connections/' + id)
   }else {
    res.status(404).send('Cannot find connection with ' + id);
   }
};

exports.delete = (req, res)=> {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/connections');
    }else {
        res.status(404).send('Cannot find connection with ' + id);
    }
};