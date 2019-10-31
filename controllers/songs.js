const express = require('express');
const songs = express.Router({ mergeParams: true });
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// Get all songs

songs.get('/', (req, res) => {
    console.log(req.params.id)
});

songs.get('/:songId', (req, res) => {

})

module.exports = songs;