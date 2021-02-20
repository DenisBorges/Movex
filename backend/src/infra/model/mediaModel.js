const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    magnetLink: String
});

module.exports = mongoose.model('Media',mediaSchema);