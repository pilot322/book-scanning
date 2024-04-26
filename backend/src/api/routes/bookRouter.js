const express = require('express');
const bookController = require('../controllers/bookController');
const { authenticateToken } = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const router = express.Router();

router.post('/', authenticateToken, checkRole(['admin', 'manager']), bookController.createBook);
router.put('/:barcode', authenticateToken, checkRole(['admin', 'manager']), bookController.updateBook);
router.delete('/:barcode', authenticateToken, checkRole(['admin']), bookController.deleteBook);
router.get('/', authenticateToken, bookController.getAllBooks);
router.get('/:barcode', authenticateToken, bookController.getBook);

module.exports = router;
