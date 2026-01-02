const express = require('express');
const router = express.Router();
const IotPayload = require('../models/IotPayload');

// ✅ POST endpoint to ingest IoT payloads
// Route: POST /api/iot/ingest
router.post('/ingest', async (req, res) => {
  try {
    // ❗ Store the entire request body as payload
    // No validation - accept any JSON structure
    const iotPayload = new IotPayload({
      payload: req.body,
      source: req.body.source || 'edge-device'
    });

    // Save to MongoDB
    await iotPayload.save();

    // Return success response
    res.status(200).json({
      status: 'success',
      message: 'Payload received'
    });
  } catch (error) {
    // ❗ Handle any errors during storage
    console.error('Error storing payload:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to store payload'
    });
  }
});

module.exports = router;


