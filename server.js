const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
require('dotenv').config();
require('./db/db');

PORT = process.env.PORT

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


const teachersController = require('./controllers/teachers');
app.use('/auth', teachersController);

const studentsController = require('./controllers/students');
app.use('/students', studentsController);

// const songsController = require('./controllers/songs');
// app.use('/students/songs', songsController);

// home page
app.get('/', (req, res) => {
    console.log(req.session);
    res.render('index', {
        session: req.session
    })
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})

// Create storage engine

// const storage = new GridFsStorage({
//     url: connectionString,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             const filename = file.originalname;
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'uploads'
//             };
//             resolve(fileInfo);
//         });
//     }
// });

// const upload = multer({ storage });
