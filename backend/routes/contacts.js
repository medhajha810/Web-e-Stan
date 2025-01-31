const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    // First check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
        console.log('Database not connected. Connection state:', mongoose.connection.readyState);
        return res.status(503).json({
            success: false,
            message: 'Service temporarily unavailable. Please try again in a moment.'
        });
    }

    try {
        // Log the incoming request
        console.log('\n=== New Contact Form Submission ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Form Data:');
        console.log('- Name:', req.body.name);
        console.log('- Email:', req.body.email);
        console.log('- Phone:', req.body.phone || 'Not provided');
        console.log('- Purpose:', req.body.purpose);
        console.log('- Preferred Contact:', req.body.preferredContact);
        console.log('- Message:', req.body.message);
        console.log('================================\n');

        // Create new contact
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone || '',
            purpose: req.body.purpose,
            message: req.body.message,
            preferredContact: req.body.preferredContact
        });

        // Save to database
        const savedContact = await contact.save();
        console.log('Contact saved successfully with ID:', savedContact._id);

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.',
            data: {
                id: savedContact._id,
                name: savedContact.name,
                email: savedContact.email
            }
        });

    } catch (error) {
        console.error('Error processing contact form:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Please check your input and try again.',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Unable to process your request at this time. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Contact API is working',
        mongoConnection: mongoose.connection.readyState
    });
});

module.exports = router;
