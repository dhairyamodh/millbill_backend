const express = require('express');
const { hotKeyController } = require('../../controllers/restaurant')

const router = express.Router();

router.get('/:resId/:branchId?', hotKeyController.all)
router.post('/create', hotKeyController.create);
router.put('/update', hotKeyController.update);
router.delete('/delete', hotKeyController.remove);

module.exports = router;