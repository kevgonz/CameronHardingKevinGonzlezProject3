const model = require('../models/story');


exports.index = (req, res)=> {
    //res.send('send all stories');
    let stories = model.find();
    res.render('./story/index', {stories});
};

exports.new = (req, res)=> {
    res.send('send new form');
};

exports.create = (req, res)=> {
    res.send('create new story')
};

exports.show = (req, res)=> {
    res.send('send story with id' + req.params.id);
};

exports.edit = (req, res)=> {
    res.send('send story edit');
};

exports.update = (req, res)=> {
    res.send('send story with id' + req.params.id);
};

exports.delete = (req, res)=> {
    res.send('delete story with id' + req.params.id);
};