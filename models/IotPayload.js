const mongoose = require('mongoose');

// ✅ Schema definition for storing IoT payloads
// Using Schema.Types.Mixed to accept ANY JSON structure
const IotPayloadSchema = new mongoose.Schema({
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  receivedAt: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    required: false,
    default: 'edge-device'
  }
}, {
  // ❗ Disable strict mode to allow any fields in payload
  strict: false,
  // Store timestamps automatically
  timestamps: false
});

// Export the model
module.exports = mongoose.model('IotPayload', IotPayloadSchema);


