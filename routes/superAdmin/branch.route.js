const express = require('express');
const validate = require('../../middlewares/validate');
const { branchController } = require('../../controllers/superAdmin')

const router = express.Router();

router.get('/all', branchController.all);
router.get('/restaurant/:id', branchController.getBranchByResId);
router.post('/create', branchController.create);
router.put('/update', branchController.update);
router.delete('/delete/:id', branchController.remove);

module.exports = router;