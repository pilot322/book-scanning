const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();

router.post('/', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
