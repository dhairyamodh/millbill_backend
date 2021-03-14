const express = require('express');
const { hotKeyController } = require('../../controllers/restaurant')
const validate = require('../../middlewares/validate');
const { hotkeyValidation } = require('../../validations/superAdmin')

const router = express.Router();

router.get('/:resId/:branchId?', hotKeyController.all)
router.post('/create', validate(hotkeyValidation.create), hotKeyController.create);
router.put('/update', validate(hotkeyValidation.update), hotKeyController.update);
router.delete('/delete', hotKeyController.remove);

module.exports = router;