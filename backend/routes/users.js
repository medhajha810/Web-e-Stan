const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming a User model exists

// User registration
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
