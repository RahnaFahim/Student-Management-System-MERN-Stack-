const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    profilePicture: String, 
    english: Number,
    tamil: Number,
    englishLit: Number,
    sinhala: Number,
    art: Number,
    ict: Number,
    science: Number,
    healthScience: Number,
    maths: Number,
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);


//collection StudentProfile in Mongodb