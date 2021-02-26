const catchAsync = require('../../utils/catchAsync');
const { branchUserService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await branchUserService.all(req.params.resId, req.params.branchId);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await branchUserService.create(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    all, create
};
