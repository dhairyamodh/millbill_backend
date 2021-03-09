const express = require('express');
const { tableController } = require('../../controllers/restaurant')

const router = express.Router();

router.get('/:resId/:branchId?', tableController.all)
router.post('/create', tableController.create);
router.put('/update', tableController.update);
router.delete('/delete', tableController.remove);

module.exports = router;