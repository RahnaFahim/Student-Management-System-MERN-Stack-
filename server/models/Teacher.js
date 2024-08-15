const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});


const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;


//collection Teacher in Mongodb