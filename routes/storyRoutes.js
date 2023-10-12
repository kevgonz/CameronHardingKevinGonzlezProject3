const express = require('express');
const controller = require('../controllers/storyController');

const router = express.Router();


//send all stories
router.get('/', controller.index);

//new story
router.get('/new', controller.new);

//post new story
router.post('/', controller.create);

//id story
router.get('/:id', controller.show);

//story edit
router.get('/:id/edit', controller.edit);

//put story update
router.put('/:id', controller.update);

//delete
router.delete('/:id', controller.delete);

module.exports = router;