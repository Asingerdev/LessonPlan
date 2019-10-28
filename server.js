const express = require('express');
const app = express();
const PORT = 3000;
require('./db/db');

app.listen(PORT, () => {
    console.log('App is running on port: ', PORT);
})