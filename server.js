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
    secret: "super-mega-hyper-cat",
    resave: false,
    saveUninitialized: false
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.user = req.session.user;
    next();
})
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));


const teachersController = require('./controllers/teachers')
app.use('/auth', teachersController);

// home page
app.get('/', (req, res) => {
    console.log(req.session);
    res.render('index')
});

app.listen(PORT, () => {
    console.log('App is running on port: ', PORT);
})