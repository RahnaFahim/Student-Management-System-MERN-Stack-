const express = require('express');
const router = express.Router();
const TeacherModel = require('../models/Teacher');

// Teacher login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email, password }); 

    TeacherModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.status(401).json("Incorrect Password");
                }
            } else {
                res.status(404).json("No record Existed");
            }
        })
        .catch(err => {
            console.error('Error occurred:', err); 
            res.status(500).json({ message: 'Error occurred', error: err.message });
        });
});


// Teacher registration route
router.post('/register', (req, res) => {
    TeacherModel.create(req.body)
        .then(teacher => res.status(201).json(teacher))
        .catch(err => {
            if (err.code === 11000) { // Duplicate email error
                res.status(400).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Error occurred', error: err.message });
            }
        });
});


module.exports = router;
