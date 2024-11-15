const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String },
    images: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
