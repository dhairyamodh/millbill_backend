const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const verify = require('../middlewares/verifyToken')
const authController = require('../controllers/auth.controller');

const router = express.Router();

function delay(req, res, next) {
    setTimeout(() => { next() }, 5000)
}

router.post('/login', validate(authValidation.login), authController.login);
router.get('/details', verify, authController.details);

module.exports = router;