const mongoose = require('mongoose');
const { Schema } = mongoose;

const errorLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional, not all errors may be directly tied to user actions
    action: { type: String, required: true }, // Description of the action during which the error occurred
    timestamp: { type: Date, default: Date.now, required: true },
    errorMessage: { type: String, required: true },
    metadata: Schema.Types.Mixed // Any additional data that might help in debugging
});

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);
module.exports = ErrorLog;