const mongoose = require('mongoose');
const { Schema } = mongoose;

const shiftSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ['in_progress', 'finished'], default: 'started' },
    metadata: Schema.Types.Mixed
});


const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
