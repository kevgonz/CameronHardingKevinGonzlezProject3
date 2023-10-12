


exports.index = (req, res)=> {
    res.send('send all stoires');
};

//new story
router.get('/new', (req, res)=> {
    res.send('send new form');
});

//post new story
router.post('/', (req, res)=> {
    res.send('create new story')
});

//id story
router.get('/:id', (req, res)=> {
    res.send('send story with id' + req.params.id);
});

//story edit
router.get('/:id/edit', (req, res)=> {
    res.send('send story edit');
});

//put story update
router.put('/:id', (req, res)=> {
    res.send('send story with id' + req.params.id);
});

//delete
router.delete('/:id', (req, res)=> {
    res.send('delete story with id' + req.params.id);
});