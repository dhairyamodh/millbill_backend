const express = require('express');
const validate = require('../../middlewares/validate');
const { branchUserController } = require('../../controllers/superAdmin')

const router = express.Router();

router.get('/:resId/:branchId?', branchUserController.all);
router.post('/create', branchUserController.create);
router.put('/update', branchUserController.update);
router.delete('/delete/:id', branchUserController.remove);

module.exports = router;