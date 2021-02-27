const catchAsync = require('../../utils/catchAsync');
const { subscriptionService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await subscriptionService.all();
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await subscriptionService.create(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    all, create
};
