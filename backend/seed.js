const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Profile = require('./models/Profile');

// Load environment variables
dotenv.config();

const sampleProfile = {
    name: "VISHAL Kumar",
    role: "Full Stack Developer",
    about: "I am a passionate developer building web applications with the MERN stack. I love solving problems and learning new technologies.",
    skills: [
        { name: "JavaScript", color: "#F7DF1E" },
        { name: "React", color: "#61DAFB" },
        { name: "Node.js", color: "#339933" },
        { name: "MongoDB", color: "#47A248" },
        { name: "Express", color: "#000000" }
    ]
};

const seedDB = async () => {
    try {
        // Connect to database - uses MONGO_URI from .env or defaults to local
        const db = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
        await mongoose.connect(db, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB Connected for seeding...');

        // Clear existing profiles
        await Profile.deleteMany({});
        console.log('Cleared existing profiles.');

        // Create new profile
        await Profile.create(sampleProfile);
        console.log('Sample profile created successfully!');

        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
};

seedDB();