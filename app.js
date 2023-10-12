//require modules
const express = require('express');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

//setup routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('./stories', storyRoutes);

//start server
app.listen(port, host, () =>{
    console.log('Server is running on port', port)
});