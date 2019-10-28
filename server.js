const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const multer = require('multer');
const PORT = 3000;
require('./db/db');

// Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(PORT, () => {
    console.log('App is running on port: ', PORT);
})