const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).send(newBook);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
