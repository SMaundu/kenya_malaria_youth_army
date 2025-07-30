const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: String,
  county: String,
  email: String,
  phone: String,
  interests: [String],
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
