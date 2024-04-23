const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    handlers: [{
        handler: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        startTime: { type: Date, default: Date.now },
        endTime: Date
    }],
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ['started', 'paused', 'finished'], default: 'started' },
    pagesScanned: Number
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
