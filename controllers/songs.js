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

// Song show page

songs.get('/:songId', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id).populate({ path: 'songs', match: { _id: req.params.songId } }).exec();
        res.render('songs/show', {
            student: foundStudent,
            song: foundStudent.songs[0]
        })
    } catch (err) {
        console.log(err);
    }
})

// Song edit page

songs.get('/:songId/edit', async (req, res) => {
    try {
        const findSong = Song.findById(req.params.songId);
        const findStudent = Student.findById = (req.params.id);
        const [foundSong, foundStudent] = await Promise.all([findSong, findStudent]);
        res.render('songs/edit', {
            student: foundStudent,
            song: foundSong
        })
    } catch (err) {
        console.log(err);
    }
});

songs.put('/:songId', async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.songId, req.body, { new: true });
        // res.redirect('/students/' + studentId + '/songs')
    } catch (err) {
        console.log(err);
    }
});

// Delete song

songs.delete('/:songId', async (req, res) => {
    try {
        const deleteSong = Song.findByIdAndRemove(req.params.songId);
        const findStudent = Student.findOne({ 'songs': req.params.songId });
        const [deletedSongResponse, foundStudent] = await Promise.all([deleteSong, findStudent]);
        foundStudent.songs.remove(req.params.songId);
        await foundStudent.save();
        console.log(foundStudent);
    } catch (err) {
        console.log(err);
    }
})


module.exports = songs;