const express = require('express');
const validate = require('../../middlewares/validate');
const { resController } = require('../../controllers/superAdmin')
const { resValidation } = require('../../validations/superAdmin')
const upload = require('../../multer/uploadLogo')

const router = express.Router();

router.get('/all', resController.all);
router.post('/create', upload.any(), resController.create);
router.put('/update', resController.update);
router.delete('/delete/:id', resController.remove);

module.exports = router;