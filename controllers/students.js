const express = require('express');
const students = express.Router();
const songs = require('./songs');
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// Nest songs controller by attaching it as middleware
students.use('/:id/songs', songs);

// /students/student1 / songs / song1
// Get all students

students.get('/', async (req, res) => {
    try {
        const foundTeacher = await Teacher.findOne({ name: req.session.name }).populate({ path: 'students' }).exec();
        res.render('students/index', {
            teacher: foundTeacher,
            students: foundTeacher.students
        });
    } catch (err) {
        console.log(err);
    }
});

// Add student

students.get('/new', (req, res) => {
    res.render('students/new');
});

students.post('/', async (req, res) => {
    try {
        const createStudent = Student.create(req.body);
        const findTeacher = Teacher.findOne({ name: req.session.name });
        const [createdStudent, foundTeacher] = await Promise.all([createStudent, findTeacher]);
        foundTeacher.students.push(createdStudent);
        await foundTeacher.save();
        await createdStudent.save();
        res.redirect('/students')
    } catch (err) {
        console.log(err);
    }
});

// Student profile page

students.get('/:id', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id);
        res.render('students/show', {
            student: foundStudent
        })
    } catch (err) {
        console.log(err);
    }
});

// Student edit page

students.get('/:id/edit', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id);
        res.render('students/edit', {
            student: foundStudent
        })
    } catch (err) {
        console.log(err);
    }
})

students.put('/:id', async (req, res) => {
    try {
        const findUpdatedStudent = Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const findFoundTeacher = Teacher.findOne({ 'students': req.params.id });
        const [updatedStudent, foundTeacher] = await Promise.all([findUpdatedStudent, findFoundTeacher]);
        res.redirect('/students');
    } catch (err) {
        console.log(err);
    }
})

// Delete student

students.delete('/:id', async (req, res) => {
    try {
        const deleteStudent = Student.findByIdAndRemove(req.params.id);
        const findTeacher = Teacher.findOne({ 'students': req.params.id });
        const [deletedStudentResponse, foundTeacher] = await Promise.all([deleteStudent, findTeacher]);
        foundTeacher.students.remove(req.params.id);
        await foundTeacher.save();
        res.redirect('/students')
    } catch (err) {
        console.log(err);
    }
})



// students.use('/:songId/songs', (req, res) => {
//     req.studentId = req.params.songId;
//     next();
// }, songs);

module.exports = students;