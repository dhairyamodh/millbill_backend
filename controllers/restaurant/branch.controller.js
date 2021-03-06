const catchAsync = require('../../utils/catchAsync');
const { branchService } = require('../../services/restaurant');


const getBranchByResId = catchAsync(async (req, res) => {
    const response = await branchService.getBranchByResId(req.params.id);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await branchService.create(req.body);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await branchService.update(req.body);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await branchService.remove(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    create, update, remove, getBranchByResId
};
