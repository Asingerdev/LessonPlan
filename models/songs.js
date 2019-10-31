const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    name: { type: String, required: true },
    img: String
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song