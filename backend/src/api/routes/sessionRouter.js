const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();


const sessionCheck = require('../../middleware/sessionCheck');
const checkRole = require('../../middleware/checkRole');
const { authenticateToken } = require('../../middleware/auth');


router.post('/start', authenticateToken, sessionCheck, sessionController.startSession);
router.post('/stop', authenticateToken, sessionController.stopSession);
router.get('/', authenticateToken, sessionController.getAllSessions);
router.get('/:id', authenticateToken, sessionController.getSession);
router.put('/:id', authenticateToken, sessionController.updateSession);
router.delete('/:id', authenticateToken, sessionCheck, checkRole(['admin']), sessionController.deleteSession);

module.exports = router;
