const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    sessionType: { type: String, enum: ['scanning', 'rescanning', 'processing'], default: 'scanning' },

    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ['in_progress', 'finished'], default: 'in_progress' },
    startPage: { type: Number, required: true },
    stopPage: Number,
    metadata: Schema.Types.Mixed
});

sessionSchema.index({ book: 1 });
sessionSchema.index({ user: 1 });
sessionSchema.index({ status: 1 });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
