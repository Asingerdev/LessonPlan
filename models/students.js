const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    instrument: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;