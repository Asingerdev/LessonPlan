const mongoose = require('mongoose')
const uniqueValidator = ('mongoose-unique-validator');

const teacherSchema = mongoose.Schema({
    name: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true }

})