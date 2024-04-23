const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post('/', sessionController.createSession);
router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
