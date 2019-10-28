const mongoose = require('mongoose')
const uniqueValidator = ('mongoose-unique-validator');

const teacherSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

teacherSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher