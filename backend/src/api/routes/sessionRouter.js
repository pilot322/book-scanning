const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();


const sessionCheck = require('../../middleware/sessionCheck');
const checkRole = require('../../middleware/checkRole');


router.post('/start', sessionCheck, sessionController.startSession);
router.post('/pause', sessionController.pauseSession);
router.post('/stop', sessionController.stopSession);

router.get('/user', sessionController.getUserSessionData);

router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionCheck, checkRole('admin'), sessionController.deleteSession);

module.exports = router;
