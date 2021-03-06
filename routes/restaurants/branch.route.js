const express = require('express');
const validate = require('../../middlewares/validate');
const { branchController } = require('../../controllers/restaurant')

const router = express.Router();

router.get('/:id', branchController.getBranchByResId);
router.post('/create', branchController.create);
router.put('/update', branchController.update);
router.delete('/delete', branchController.remove);

module.exports = router;