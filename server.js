const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const multer = require('multer');
const PORT = 3000;
require('./db/db');


// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));



// home page
app.get('/', (req, res) => {
    res.render('index')
});


app.listen(PORT, () => {
    console.log('App is running on port: ', PORT);
})