const express = require('express');
const router = express.Router();
const Teacher = require('../models/teachers');
const Student = require('../models/students');

// Get all students

router.get('/', (req, res) => {
    const foundStudents = await Teacher.findOne({ name: req.session.name }).populate('students');

});