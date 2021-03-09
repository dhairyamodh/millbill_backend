const express = require('express');
const branch = require('./branch.route')
const router = express.Router();
const verify = require('../../middlewares/verifyToken')
const restaurantuser = require('./restaurantuser.route')
const itemcategory = require('./itemcategory.route')
const items = require('./item.route')
const hotkey = require('./hotkey.route')
const table = require('./table.route')
const order = require('./order.route')

router.use('/branches', verify, branch);
router.use('/users', verify, restaurantuser);
router.use('/itemcategory', verify, itemcategory);
router.use('/items', verify, items);
router.use('/hotkeys', verify, hotkey);
router.use('/tables', verify, table);
router.use('/orders', verify, order);

module.exports = router;
