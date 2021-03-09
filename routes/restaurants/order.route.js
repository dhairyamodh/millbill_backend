const express = require('express');
const { orderController } = require('../../controllers/restaurant')

const router = express.Router();

router.get('/:resId/:branchId?', orderController.all)
router.post('/create', orderController.create);
router.put('/update', orderController.update);
router.delete('/delete', orderController.remove);

module.exports = router;