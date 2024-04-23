const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    onModel: { type: String, required: true },
    target: { type: Schema.Types.ObjectId, required: true, refPath: 'onModel' },
    type: { type: String, required: true }, // Could be things like "error", "suggestion", etc.
    comment: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: Schema.Types.Mixed,
    associatedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
