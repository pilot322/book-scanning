const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const sessionCheck = require('../../middleware/sessionCheck');
const checkRole = require('../../middleware/checkRole');


router.post('/', checkRole(), sessionCheck, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', checkRole(), sessionCheck, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
