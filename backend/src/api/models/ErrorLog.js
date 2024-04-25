// ErrorLog.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const errorLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional, not all errors may be directly tied to user actions
    action: { type: String, required: true }, // Description of the action during which the error occurred
    timestamp: { type: Date, default: Date.now, required: true },
    errorMessage: { type: String, required: true },
    metadata: Schema.Types.Mixed // Any additional data that might help in debugging
});

// Function to create and log an error
errorLogSchema.statics.logError = async function ({ user, action, errorMessage, metadata = {} }) {
    try {
        const errorLog = new this({
            user,
            action,
            errorMessage,
            metadata
        });
        await errorLog.save();
        console.log('Error logged successfully');
        return errorLog; // Return the error log object
    } catch (error) {
        console.error('Failed to log error: ', error);
        return null; // Return null if an error occurs
    }
};

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);
module.exports = ErrorLog;
