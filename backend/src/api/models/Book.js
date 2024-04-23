const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    barcode: { type: String, required: true, unique: true },
    bookType: String,
    department: String,
    status: { type: String, enum: ['received', 'scanning', 'paused', 'finished'], default: 'received' },
    currentHandler: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receivedDate: { type: Date, default: Date.now },
    completionDate: Date
});

// Static method to find books by status
bookSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
