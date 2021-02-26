const express = require('express');
const resturant = require('./restaurant.route')
const branch = require('./branch.route')
const branchuser = require('./branchuser.route')
const router = express.Router();

router.use('/restaurants', resturant);
router.use('/branches', branch);
router.use('/branchusers', branchuser);

module.exports = router;
