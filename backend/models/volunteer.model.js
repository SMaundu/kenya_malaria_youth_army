const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  county: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interests: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
