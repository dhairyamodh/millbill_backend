const catchAsync = require('../../utils/catchAsync');
const { orderService } = require('../../services/restaurant');


const all = catchAsync(async (req, res) => {
    const response = await orderService.all(req.params.resId, req.params.branchId);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await orderService.create(req.body);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await orderService.update(req.body);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await orderService.remove(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    create, update, remove, all
};
