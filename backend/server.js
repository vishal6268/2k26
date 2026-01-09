require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // 5 seconds mein fail ho jayega agar connect nahi hua
    dbName: 'portfolio'
})
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => {
    console.error("❌ Connection error:", err.message);
    if (err.message.includes('bad auth') || err.message.includes('authentication failed')) {
        console.log("💡 Tip: Password mein special characters (@, :, #) ko URL encode karein (e.g., @ -> %40).");
    }
});

// Routes - Ab humne routes ko alag file se connect kar diya
app.use('/api/profile', require('./routes/profile'));

app.get('/', (req, res) => res.send("API is running..."));

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));