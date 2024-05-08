const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

const sessionCheck = require('../../middleware/sessionCheck');
const checkRole = require('../../middleware/checkRole');

router.post('/', checkRole('manager'), sessionCheck, bookController.receiveBatches);
router.put('/:barcode', checkRole('manager'), sessionCheck, bookController.updateBook);
router.delete('/:barcode', checkRole(), sessionCheck, bookController.deleteBook);

router.get('/', sessionCheck, bookController.getAllBooks);
router.get('/:barcode', sessionCheck, bookController.getBook);
router.post('/filter', sessionCheck, bookController.filterBooks);
router.get('/:barcode', bookController.getBook);

module.exports = router;
