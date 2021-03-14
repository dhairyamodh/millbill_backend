const express = require('express');
const validate = require('../../middlewares/validate');
const { branchController } = require('../../controllers/restaurant')
const { branchValidation } = require('../../validations/superAdmin')

const router = express.Router();

router.get('/:id', branchController.getBranchByResId);
router.post('/create', validate(branchValidation.create), branchController.create);
router.put('/update', validate(branchValidation.update), branchController.update);
router.delete('/delete', branchController.remove);

module.exports = router;