const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    about: String,
    skills: [
        { name: String, color: String }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);