const express = require('express');
const validate = require('../../middlewares/validate');
const { themeController } = require('../../controllers/superAdmin')

const router = express.Router();

router.get('/all', themeController.all);
router.post('/create', themeController.create);

module.exports = router;