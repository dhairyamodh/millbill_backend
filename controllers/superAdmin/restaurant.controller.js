const catchAsync = require('../../utils/catchAsync');
const { resService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await resService.all();
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await resService.create(req.body, req.files);
    res.status(response.status).send(response);
});

module.exports = {
    all, create
};
