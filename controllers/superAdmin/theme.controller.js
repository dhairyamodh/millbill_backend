const catchAsync = require('../../utils/catchAsync');
const { themeService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await themeService.all();
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await themeService.create(req.body);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await themeService.update(req.body);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await themeService.remove(req.params.id);
    res.status(response.status).send(response);
});

module.exports = {
    all, create, update, remove
};
