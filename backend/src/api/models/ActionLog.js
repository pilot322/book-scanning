const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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

actionLogSchema.index({ timestamp: -1 });


actionLogSchema.statics.createAction = async function (actionDetails) {
    const action = new this(actionDetails);
    try {
        return action.save(); // Ensuring a return that can be thenable
    } catch (error) {
        console.error('Error logging action: ', error);
        throw error; // Ensuring errors are propagated
    }
};

const ActionLog = mongoose.model('ActionLog', actionLogSchema);
module.exports = ActionLog;
