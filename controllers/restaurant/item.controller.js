const catchAsync = require('../../utils/catchAsync');
const { itemService } = require('../../services/restaurant');


const all = catchAsync(async (req, res) => {
    const response = await itemService.all(global.restaurants[req.resdb], req.params.resId, req.params.branchId);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await itemService.create(global.restaurants[req.resdb], req.body, req.files);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await itemService.update(global.restaurants[req.resdb], req.body, req.files);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await itemService.remove(global.restaurants[req.resdb], req.body);
    res.status(response.status).send(response);
});

module.exports = {
    create, update, remove, all
};
