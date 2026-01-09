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
    serverSelectionTimeoutMS: 5000 // 5s timeout if DB doesn't connect
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => {
    console.log("❌ DB Error:", err);
    console.log("💡 Tip: Check MongoDB Atlas Network Access (IP Whitelist 0.0.0.0/0) if timeout occurs.");
  });

// Routes - Ab humne routes ko alag file se connect kar diya
app.use('/api/profile', require('./routes/profile'));

app.get('/', (req, res) => res.send("API is running..."));

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));