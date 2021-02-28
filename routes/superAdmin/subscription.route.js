const express = require('express');
const validate = require('../../middlewares/validate');
const { subscriptionController } = require('../../controllers/superAdmin')

const router = express.Router();

router.get('/all', subscriptionController.all);
router.post('/create', subscriptionController.create);
router.put('/update', subscriptionController.update);
router.delete('/delete/:id', subscriptionController.remove);

module.exports = router;