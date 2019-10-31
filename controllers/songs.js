const express = require('express');
const songs = express.Router({ mergeParams: true });
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// Get all songs

songs.get('/', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id).populate({ path: 'songs' }).exec();
        res.render('songs/index', {
            student: foundStudent,
            songs: foundStudent.songs
        })
    } catch (err) {
        console.log(err);
    }
});

// Add song

songs.get('/new', (req, res) => {
    res.render('songs/new');
});



songs.get('/:songId', (req, res) => {

})

module.exports = songs;