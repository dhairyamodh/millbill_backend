const catchAsync = require('../../utils/catchAsync');
const { restaurantUserService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await restaurantUserService.all(req.params.resId, req.params.branchId);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await restaurantUserService.create(req.body);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await restaurantUserService.update(req.body);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await restaurantUserService.remove(req.params.id);
    res.status(response.status).send(response);
});

module.exports = {
    all, create, update, remove
};
