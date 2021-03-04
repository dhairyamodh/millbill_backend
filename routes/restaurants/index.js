const express = require('express');
const branch = require('./branch.route')
const router = express.Router();
const verify = require('../../middlewares/verifyToken')

router.use('/branches', verify, branch);

module.exports = router;
