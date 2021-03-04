var { Restaurant } = require('../models/superAdmin');

function restaurantlistener() {
    console.log('listening for restaurabnt');
    return async function (req, res, next) {
        const restaurantName = req.body.restaurantName;
        await Restaurant.findOne({ name: restaurantName }, async function (err, client) {
            if (!err) {
                if (!client) {
                    //res.send(client);
                    // console.log('creating  database for ' + restaurantName);
                    const restaurant = await Restaurant.create({ name: restaurantName });

                    // console.log('created database for ' + restaurant.restaurant);
                    //console.log(JSON.stringify(client, null, 4));
                    //console.log(client);
                    // req.session.tester = "moyo cow";
                    req.Restaurant = restaurant.name;
                    return next();
                } else {
                    // console.log('searched database for ' + restaurantName);
                    //console.log(JSON.stringify(client, null, 4));
                    //console.log(client);
                    // req.session.tester = "moyo cow";
                    req.Restaurant = client.name;
                    return next();
                }
            } else {
                console.log(err);
                return next(err);
            }
        });
    };
}

module.exports = restaurantlistener;
