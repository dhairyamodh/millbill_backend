const catchAsync = require('../../utils/catchAsync');
const { restaurantUserService } = require('../../services/restaurant');

const all = catchAsync(async (req, res) => {
    const response = await restaurantUserService.all(global.restaurants[req.resdb], req.params.resId, req.params.branchId);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await restaurantUserService.create(req.resdb, req.body);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await restaurantUserService.update(req.body);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await restaurantUserService.remove(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    all, create, update, remove
};
