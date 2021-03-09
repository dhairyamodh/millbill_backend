const express = require('express');
const theme = require('./theme.route')
const resturant = require('./restaurant.route')
const subscription = require('./subscription.route')
const commoncollection = require('./commoncollection.route')
const router = express.Router();

router.use('/themes', theme);
router.use('/restaurants', resturant);
router.use('/subscriptions', subscription);
router.use('/commoncollections', commoncollection);

module.exports = router;
