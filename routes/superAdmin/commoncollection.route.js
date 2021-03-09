const express = require('express');
const { commonCollectionController } = require('../../controllers/superAdmin')
const upload = require('../../multer/uploadLogo')

const router = express.Router();

router.get('/all/:type', commonCollectionController.all);
router.post('/create', commonCollectionController.create);
router.put('/update', commonCollectionController.update);
router.delete('/delete/:id', commonCollectionController.remove);

module.exports = router;