const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const PORT = 3000;
require('./db/db');


// Middleware
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

// home page
app.get('/', (req, res) => {
    console.log(req.session);
    res.render('index')
});

app.listen(PORT, () => {
    console.log('App is running on port: ', PORT);
})