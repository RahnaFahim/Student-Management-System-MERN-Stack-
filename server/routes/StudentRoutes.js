const express = require('express');
const router = express.Router();
const StudentModel = require('../models/Student');
const { sendRegistrationEmail } = require('../emailService'); 


// Check email uniqueness
router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    try {
        const student = await StudentModel.findOne({ email });
        res.json({ exists: student ? true : false });
    } catch (error) {
        res.status(500).json({ message: 'Error checking email', error: error.message });
    }
});

// Student register
router.post('/student-register', async (req, res) => {
    const { firstName, lastName, age, email, password } = req.body;

    if (age < 18) {
        return res.status(400).json({ message: 'Age must be 18 or older' });
    }

    try {
        const student = await StudentModel.create(req.body);
        console.log('Student registered successfully:', student);

        // Send confirmation email
        await sendRegistrationEmail(email, 'Registration Successful', `Welcome ${firstName}, your registration is successful!`);
        res.status(201).json(student);
    } catch (err) {
        console.error('Error registering student:', err.message);
        res.status(500).json({ message: 'Error registering student', error: err.message });
    }
});

// Student login route
router.post('/student-login', (req, res) => {
    const { email, password } = req.body;

    StudentModel.findOne({ email })
        .then(student => {
            if (student) {
                if (student.password === password) {
                    res.json("Success");
                } else {
                    res.json("Incorrect Password");
                }
            } else {
                res.json("No record Existed");
            }
        })
        .catch(err => res.status(500).json({ message: 'Error occurred', error: err.message }));
});

module.exports = router;
