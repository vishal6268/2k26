const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.get('/', async (req, res) => {
    try {
        console.log("Attempting to fetch profile...");
        const profile = await Profile.findOne();
        
        if (!profile) {
            console.log("No profile found.");
            return res.status(404).json({ message: "No profile found in database." });
        }
        console.log("Profile data retrieved:", profile);
        res.json(profile);
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

// @route   POST api/profile
// @desc    Create a new profile
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newProfile = new Profile({
            ...req.body
        });

        const profile = await newProfile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error("Error creating profile:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

// @route   PUT api/profile/update
// @desc    Update the profile
// @access  Public
router.put('/update', async (req, res) => {
    try {
        // Find the existing profile (assuming single user for now)
        let profile = await Profile.findOne();

        if (profile) {
            // Update existing profile
            profile = await Profile.findOneAndUpdate({}, { $set: req.body }, { new: true });
            return res.json(profile);
        } else {
            return res.status(404).json({ message: "Profile not found to update" });
        }
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;