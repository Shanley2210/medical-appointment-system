const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    '/profile',
    authMiddleware.verifyToken,
    patientController.getProfileController
);

router.put(
    '/profile',
    authMiddleware.verifyToken,
    patientController.putProfileController
);

module.exports = router;
