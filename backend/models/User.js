const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }]
});

module.exports = mongoose.model('User', userSchema);
