const express = require('express');
const router = express.Router();
const Teacher = require('../models/teachers');
const Student = require('../models/students');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    try {
        const foundTeacher = await Teacher.findOne({ email: req.body.email })
        if (foundTeacher) {
            if (bcrypt.compareSync(req.body.password, foundTeacher.password)) {
                req.session.name = foundTeacher.name;
                req.session.logged = true;
                res.redirect('/students');
            } else {
                req.session.message = 'Email or password is incorrect';
                res.redirect('/');
            }
        } else {
            req.session.message = 'Email or password is incorrect';
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/registration', async (req, res) => {
    try {
        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const teacherDbEntry = {};
        teacherDbEntry.name = req.body.name;
        teacherDbEntry.email = req.body.email;
        teacherDbEntry.password = passwordHash;
        const createdTeacher = await Teacher.create(teacherDbEntry);
        console.log(createdTeacher);
        req.session.name = createdTeacher.name
        req.session.logged = true;
        res.redirect('/students');
    } catch (err) {
        console.log(err)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})

module.exports = router;