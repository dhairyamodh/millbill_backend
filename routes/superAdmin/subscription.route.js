const express = require('express');
const validate = require('../../middlewares/validate');
const { subscriptionController } = require('../../controllers/superAdmin')

const router = express.Router();

router.get('/all', subscriptionController.all);
router.post('/create', subscriptionController.create);

module.exports = router;