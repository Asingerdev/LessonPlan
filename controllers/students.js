const express = require('express');
const router = express.Router();
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// Get all students

router.get('/', async (req, res) => {
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

router.get('/new', (req, res) => {
    res.render('students/new');
});

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.param.id);
        res.render('students/show', {
            student: foundStudent
        })
    } catch (err) {
        console.log(err);
    }
});

// Student edit page

router.get('/:id/edit', async (req, res) => {
    try {
        const foundStudent = await Student.findById(req.param.id);
        res.render('students/edit', {
            student: foundStudent
        })
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(updatedStudent);
        res.redirect('/students')
    } catch (err) {
        console.log(err);
    }
})

// Delete student

router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndRemove(req.params.id);
        console.log(deletedStudent);
        res.redirect('/students')
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;