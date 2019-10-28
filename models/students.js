const mongoose = require('mongoose');

const uniqueValidator = ('mongoose-unique-validator');

const studentSchema = mongoose.Schema({
    name: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

studentSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;