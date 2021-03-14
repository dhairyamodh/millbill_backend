var mongoose = require('mongoose');
const { Restaurant } = require('../models/superAdmin');
const models = require('../models/restaurant');

async function setrestaurantdb(restaurantId, next) {
    let currentRestaurant = await Restaurant.findById(restaurantId)
    const restaurantName = await currentRestaurant.name.split(" ").join("");
    if (typeof restaurantName !== 'undefined') {
        if (restaurantName) {
            console.log('setting db for restaurant ' + restaurantName);

            let restaurant = mongoose.createConnection(`mongodb://127.0.0.1:27017/${restaurantName}`);

            restaurant.on('connected', async function () {
                console.log('Mongoose default connection open to  ' + restaurantName);
                await Promise.all(Object.keys(models).map((key) => {
                    global.restaurants[restaurantId] = { ...global.restaurants[restaurantId], [key]: restaurant.model(key, models[key]) }
                }))

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
        next && next()
    }
}

function setallrestaurantdb() {
    return async function (req, res, next) {
        let currentRestaurant = await Restaurant.find()

        if (currentRestaurant.length > 0) {
            currentRestaurant.forEach((res, index) => {
                const restaurantName = res.name.split(" ").join("");
                const restaurantId = res._id;
                console.log('setting db for restaurant ' + restaurantName);

                let restaurant = mongoose.createConnection(`mongodb://127.0.0.1:27017/${restaurantName}`);

                restaurant.on('connected', async function () {
                    console.log('Mongoose default connection open to  ' + restaurantName);
                    await Promise.all(Object.keys(models).map((key) => {
                        global.restaurants[restaurantId] = { ...global.restaurants[restaurantId], [key]: restaurant.model(key, models[key]) }
                    }))

                    // console.log('global res', global.restaurants);
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
            })


        }
        next()
    }
}

module.exports = { setallrestaurantdb };
