/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Define the schema for a session.
 * @typedef {Object} Session
 * @property {Schema.Types.ObjectId} book - The ID of the book associated with the session. It is required.
 * @property {Schema.Types.ObjectId} user - The ID of the user associated with the session. It is required.
 * @property {string} sessionType - The type of the session. It can be 'scanning', 'rescanning', or 'processing'. The default is 'scanning'.
 * @property {Date} startTime - The start time of the session. The default is the current date and time.
 * @property {Date} endTime - The end time of the session.
 * @property {string} status - The status of the session. It can be 'in_progress' or 'finished'. The default is 'in_progress'.
 * @property {number} startPage - The page number where the session starts.
 * @property {number} stopPage - The page number where the session stops.
 * @property {Schema.Types.Mixed} metadata - Additional data related to the session.
 */
const sessionSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionType: { type: String, enum: ['scanning', 'rescanning', 'processing'], default: 'scanning' },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    status: { type: String, enum: ['in_progress', 'finished'], default: 'in_progress' },
    scannerId: String,
    startPage: Number,
    stopPage: Number,
    metadata: Schema.Types.Mixed
});

/**
 * Define the indexes for the session schema.
 */
sessionSchema.index({ book: 1 });
sessionSchema.index({ user: 1 });
sessionSchema.index({ status: 1 });

/**
 * Compile the schema into a model.
 * @type {mongoose.Model}
 */
const Session = mongoose.model('Session', sessionSchema);

/**
 * Export the Session model.
 */
module.exports = Session;
