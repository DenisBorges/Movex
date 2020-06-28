const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    titulo: String,
    magnetLink: String
});

module.exports = mongoose.model('Media',mediaSchema);