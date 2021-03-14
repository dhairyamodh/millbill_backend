const express = require('express');
const { itemController } = require('../../controllers/restaurant')
const upload = require('../../multer/uploadItemImage')
const compressimage = require('../../middlewares/compressimages')

const router = express.Router();

router.get('/:resId/:branchId?', itemController.all)
router.post('/create', upload.any(), itemController.create);
router.put('/update', upload.any(), itemController.update);
router.delete('/delete', itemController.remove);

module.exports = router;