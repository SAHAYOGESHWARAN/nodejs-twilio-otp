require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const db = require('./config/db');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
db();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
