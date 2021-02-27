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

const update = catchAsync(async (req, res) => {
    const response = await resService.update(req.body, req.files);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await resService.remove(req.params.id);
    res.status(response.status).send(response);
});

module.exports = {
    all, create, update, remove
};
