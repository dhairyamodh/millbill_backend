const catchAsync = require('../../utils/catchAsync');
const { itemCategoryService } = require('../../services/restaurant');


const all = catchAsync(async (req, res) => {
    const response = await itemCategoryService.all(req.params.resId, req.params.branchId);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await itemCategoryService.create(req.body, req.files);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await itemCategoryService.update(req.body, req.files);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await itemCategoryService.remove(req.body);
    res.status(response.status).send(response);
});

module.exports = {
    create, update, remove, all
};
