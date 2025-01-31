const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    purpose: {
        type: String,
        enum: ['donate', 'volunteer', 'receive'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    preferredContact: {
        type: String,
        enum: ['email', 'phone'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
