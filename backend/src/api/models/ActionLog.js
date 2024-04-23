const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, required: true }, // Such as "CREATE", "UPDATE", "DELETE"
    description: { type: String },
    target: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    onModel: { type: String, required: true }, // Specifies the model on which the action was performed
    timestamp: { type: Date, default: Date.now, required: true },
    success: { type: Boolean, default: true }, // Whether the action was successful
    metadata: Schema.Types.Mixed
});

actionLogSchema.index({ user: 1 });
actionLogSchema.index({ actionType: 1 });
actionLogSchema.index({ target: 1 });

actionLogSchema.timestamp({ user: -1 });

const ActionLog = mongoose.model('ActionLog', actionLogSchema);
module.exports = ActionLog;
