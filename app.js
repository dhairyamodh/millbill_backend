const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const config = require('./config/config');
const morgan = require('./config/morgan');
const superAdminRoutes = require('./routes/superAdmin')
const routes = require('./routes');
const path = require('path');
const restaurantRoutes = require('./routes/restaurants')
const { setallrestaurantdb } = require('./config/setrestaurantdb');
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.static(path.join(__dirname, '/')));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

global.ObjectId = require('mongodb').ObjectID;


global.restaurants = {};
global.activedb = undefined;
global.restaurantdbconn = [];

app.use(setallrestaurantdb());

app.use('/api', routes);

app.use('/api/superadmin', superAdminRoutes);

app.use('/api/restaurant', restaurantRoutes)
// app.use((req, res, next) => {
//   console.log(global.restaurants);
//   return next()
// })
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(res.status(httpStatus.NOT_FOUND).send('Not Found'));
});



module.exports = app;
