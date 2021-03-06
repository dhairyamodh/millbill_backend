const express = require('express');
const validate = require('../../middlewares/validate');
const { restaurantUserController } = require('../../controllers/restaurant')

const router = express.Router();

router.get('/:resId/:branchId?', restaurantUserController.all);
router.post('/create', restaurantUserController.create);
router.put('/update', restaurantUserController.update);
router.delete('/delete', restaurantUserController.remove);

module.exports = router;