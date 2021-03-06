const express = require('express');
const theme = require('./theme.route')
const resturant = require('./restaurant.route')
const subscription = require('./subscription.route')
const router = express.Router();

router.use('/themes', theme);
router.use('/restaurants', resturant);
router.use('/subscriptions', subscription);

module.exports = router;
