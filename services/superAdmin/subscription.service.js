const httpStatus = require('http-status');
const { Subscription } = require('../../models/superAdmin');
const all = async () => {
    try {
        const subscriptions = await Subscription.aggregate([
            {
                $lookup: {
                    from: "restaurants",
                    localField: "_id",
                    foreignField: "subscriptionId",
                    as: "restaurants",
                }
            },
            {
                $project: {
                    subscriptionName: "$subscriptionName",
                    subscriptionDuration: "$subscriptionDuration",
                    subscribers: { $size: "$restaurants" },
                }
            },
        ]);
        return ({ status: httpStatus.OK, data: subscriptions })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {
        await Subscription.create(data)
        return ({ status: httpStatus.OK, message: 'Subscription Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create
}