const model = require('../models/story');


exports.index = (req, res)=> {
    //res.send('send all stories');
    let stories = model.find();
    res.render('./story/index', {stories});
};

exports.new = (req, res)=> {
    res.render('./story/new');
};

exports.create = (req, res)=> {
    //res.send('create new story')
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
};

exports.show = (req, res)=> {
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/show', {story});
    }else {
        res.status(404).send('Cannot find story with ' + id);
    }
};

exports.edit = (req, res)=> {
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/edit', {story});
    }else {
        res.status(404).send('Cannot find story with ' + id);
    }
};

exports.update = (req, res)=> {
   let story = req.body;
   let id = req.params.id;

   if(model.updateById(id, story)){
        res.redirect('/stories/' + id)
   }else {
    res.status(404).send('Cannot find story with ' + id);
   }
};

exports.delete = (req, res)=> {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/stories');
    }else {
        res.status(404).send('Cannot find story with ' + id);
    }
};