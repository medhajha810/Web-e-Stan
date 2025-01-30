const express = require('express');
const router = express.Router();

const Donation = require('../models/Donation'); // Assuming a Donation model exists

// Create a new donation
router.post('/', async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const donation = new Donation({ userId, amount });
        await donation.save();
        res.status(201).send(donation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all donations
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).send(donations);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
