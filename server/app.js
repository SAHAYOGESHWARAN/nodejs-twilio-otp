require('dotenv').config(); // Ensure this is loaded first
const express = require('express');
const cors = require('cors');
const otpRouter = require('./routes/otp.routes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/otp', otpRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
