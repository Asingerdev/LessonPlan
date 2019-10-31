const express = require('express');
const songs = express.Router({ mergeParams: true });
const Song = require('../models/songs');
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

songs.get('/new', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id);
        res.render('songs/new', {
            student: foundStudent
        });
    } catch (err) {
        console.log(err);
    }
});

songs.post('/', async (req, res) => {
    try {
        const createSong = Song.create(req.body);
        const findStudent = Student.findById(req.params.id).populate({ path: 'songs' }).exec();
        const [createdSong, foundStudent] = await Promise.all([createSong, findStudent]);
        foundStudent.songs.push(createdSong);
        await foundStudent.save();
        await createdSong.save();
        res.redirect('/students/' + req.params.id + '/songs');
    } catch (err) {
        console.log(err);
    }
});



songs.get('/:songId', (req, res) => {

})

module.exports = songs;