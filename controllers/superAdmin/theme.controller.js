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

module.exports = {
    all, create
};
