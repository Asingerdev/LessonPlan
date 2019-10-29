const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    name: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher