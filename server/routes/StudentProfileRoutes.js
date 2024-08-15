const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const upload = require('../middleware/multerConfig');

// Get the student's profile
router.get('/student-profile', async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ email: req.query.email });
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update the student's profile
router.post('/student-profile', upload.single('profilePicture'), async (req, res) => {
    try {
        const { firstName, lastName, email, english, tamil, englishLit, sinhala, art, ict, science, healthScience, maths } = req.body;
        const profilePicture = req.file ? req.file.filename : null; // Get the file name if uploaded

        // Find the profile by email
        let profile = await StudentProfile.findOne({ email });

        if (profile) {
            // Update the existing profile
            profile = await StudentProfile.findOneAndUpdate(
                { email },
                { firstName, lastName, english, tamil, englishLit, sinhala, art, ict, science, healthScience, maths, profilePicture },
                { new: true }
            );
            res.json(profile);
        } else {
            // Create a new profile if it doesn't exist
            profile = new StudentProfile({
                firstName, lastName, email, english, tamil, englishLit, sinhala, art, ict, science, healthScience, maths, profilePicture
            });
            await profile.save();
            res.status(201).json(profile);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
