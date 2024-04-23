const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    handler: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ['in_progress', 'finished'], default: 'in_progress' },
    pagesScanned: Number
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
