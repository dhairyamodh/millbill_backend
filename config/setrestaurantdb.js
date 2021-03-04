var mongoose = require('mongoose');
const { Restaurant } = require('../models/superAdmin');
const { branchSchema, Branch } = require('../models/restaurant/branch.model');

async function setrestaurantdb(restaurantId) {
    let currentRestaurant = await Restaurant.findOne({ name: restaurantId })
    console.log("restaurantId", restaurantId);
    const restaurantName = await currentRestaurant.name
    if (typeof restaurantName !== 'undefined') {
        if (restaurantName) {
            console.log('setting db for restaurant ' + restaurantName);

            let restaurant = mongoose.createConnection(`mongodb://127.0.0.1:27017/${restaurantName}`);

            restaurant.on('connected', async function () {
                console.log('Mongoose default connection open to  ' + restaurantName);
                global.restaurants[restaurantName] = { Branch: restaurant.model('Branch', branchSchema) }
                console.log('global res', global.restaurants);
            });
            restaurant.on('disconnected', function () {
                console.log('Mongoose ' + restaurantName + ' connection disconnected');
            });

            process.on('SIGINT', function () {
                restaurant.close(function () {
                    console.log(restaurantName + ' connection disconnected through app termination');
                    process.exit(0);
                });
            });

        }
    }
}

module.exports = setrestaurantdb;
