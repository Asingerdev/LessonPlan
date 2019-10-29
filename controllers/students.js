const express = require('express');
const router = express.Router();
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// Get all students

router.get('/', async (req, res) => {
    try {
        // const foundStudents = await Student.find({ teacher: teacher._id });
        // console.log(foundStudents);
        res.render('students/index');
    } catch (err) {
        console.log(err);
    }
});

// Add a student

router.get('/new', (req, res) => {
    res.render('students/new');
})

router.post('/', async (req, res) => {
    try {
        const createdStudent = await Student.create(req.body);
        createdStudent.teacher = req.session.id;
        console.log(createdStudent);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;