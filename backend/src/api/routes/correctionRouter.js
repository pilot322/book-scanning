const express = require('express');
const correctionController = require('../controllers/correctionController');
const router = express.Router();

router.post('/barcodes', correctionController.handleBarcodes);
router.post('/errors', correctionController.handleErrors);

module.exports = router;
