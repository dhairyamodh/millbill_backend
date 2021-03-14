const express = require('express');
const validate = require('../../middlewares/validate');
const { restaurantUserController } = require('../../controllers/restaurant')
const { restaurantUserValidation } = require('../../validations/superAdmin')

const router = express.Router();

router.get('/:resId/:branchId?', restaurantUserController.all);
router.post('/create', validate(restaurantUserValidation.create), restaurantUserController.create);
router.put('/update', validate(restaurantUserValidation.update), restaurantUserController.update);
router.delete('/delete', restaurantUserController.remove);

module.exports = router;