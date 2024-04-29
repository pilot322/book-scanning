const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

const sessionCheck = require('../../middleware/sessionCheck');
const checkRole = require('../../middleware/checkRole');
const { authenticateToken } = require('../../middleware/auth');


router.post('/', authenticateToken, checkRole(['admin', 'manager']), sessionCheck, bookController.createBook);
router.put('/:barcode', authenticateToken, checkRole(['admin', 'manager']), sessionCheck, bookController.updateBook);
router.delete('/:barcode', authenticateToken, checkRole(['admin']), sessionCheck, bookController.deleteBook);
router.get('/', authenticateToken, sessionCheck, bookController.getAllBooks);
router.get('/:barcode', authenticateToken, bookController.getBook);

module.exports = router;
