const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: { type: Number, min: 18 },
    email: { type: String, unique: true },
    password: String
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;

//collection Student in Mongodb