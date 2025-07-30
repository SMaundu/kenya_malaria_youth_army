const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer.model');

router.post('/', async (req, res) => {
  try {
    const { name, county, email, phone, interests } = req.body;

    const newVolunteer = new Volunteer({ name, county, email, phone, interests });
    await newVolunteer.save();

    res.status(201).json({ message: 'Volunteer added successfully!' });
  } catch (err) {
    console.error('Error saving to MongoDB:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
