const catchAsync = require('../../utils/catchAsync');
const { commonCollectionService } = require('../../services/superAdmin');

const all = catchAsync(async (req, res) => {
    const response = await commonCollectionService.all(req.params.type);
    res.status(response.status).send(response);
});

const create = catchAsync(async (req, res) => {
    const response = await commonCollectionService.create(req.body, req.params.type);
    res.status(response.status).send(response);
});

const update = catchAsync(async (req, res) => {
    const response = await commonCollectionService.update(req.body);
    res.status(response.status).send(response);
});

const remove = catchAsync(async (req, res) => {
    const response = await commonCollectionService.remove(req.params.id);
    res.status(response.status).send(response);
});

module.exports = {
    all, create, update, remove
};
