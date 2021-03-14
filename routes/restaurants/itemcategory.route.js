const express = require('express');
const { itemCategoryController } = require('../../controllers/restaurant')
const upload = require('../../multer/uploadCategoryImage')

const router = express.Router();
router.post('/create', upload.any(), itemCategoryController.create);
router.get('/:resId/:branchId?', itemCategoryController.all)
// router.post('/create', upload.any(), itemCategoryController.create);


router.put('/update', upload.any(), itemCategoryController.update);
router.delete('/delete', itemCategoryController.remove);

module.exports = router;