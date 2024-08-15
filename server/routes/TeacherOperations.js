const express = require('express');
const StudentProfile = require('../models/StudentProfile');

const router = express.Router();

// Get all student profiles
router.get('/students', async (req, res) => {
    try {
        const students = await StudentProfile.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single student profile by ID
router.get('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentProfile.findById(id);
        console.log(student); // Log the fetched student profile
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a student profile by ID
router.put('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProfile = await StudentProfile.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a student profile by ID
router.delete('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await StudentProfile.findByIdAndDelete(id);
        res.json({ message: 'Student profile deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
