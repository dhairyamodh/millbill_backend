const catchAsync = require('../../utils/catchAsync');
const { branchService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await branchService.all();
    res.status(response.status).send(response);
});

const getBranchByResId = catchAsync(async (req, res) => {
    const response = await branchService.getBranchByResId(req.params.id);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    console.log(req.body);
    const response = await branchService.create(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    all, create, getBranchByResId
};
