const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ['in_progress', 'finished'], default: 'started' },
});

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
