const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true, unique: true },
    barcode: { type: String, required: true, unique: true },

    // bookType: String, // tha doyme

    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receivedDate: { type: Date, default: Date.now },
    currentDepartmentId: Number,
    ypothikofylakeioId: Number,

    status: { type: String, enum: ['received', 'scanning', 'paused', 'finished'], default: 'received' },
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
    // associatedUsers: [{type: Schema.Types.ObjectId, ref: 'User' }];
    tags: [{ type: String, default: "" }],

    // permissions: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    completionDate: Date,

    metadata: Schema.Types.Mixed
});

bookSchema.index({ title: 1 }); // Ascending index
bookSchema.index({ barcode: -1 }); // Descending index

// Static method to find books by status
bookSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
