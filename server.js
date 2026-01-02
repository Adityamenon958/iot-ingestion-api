require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const iotRoutes = require('./routes/iot');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ✅ MongoDB connection
// ❗ Make sure MONGO_URI is set in .env file
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/iot-data';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

// ✅ Health check route
// Route: GET /health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Mount IoT routes
// All routes will be prefixed with /api/iot
app.use('/api/iot', iotRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 IoT ingest: http://localhost:${PORT}/api/iot/ingest`);
});


