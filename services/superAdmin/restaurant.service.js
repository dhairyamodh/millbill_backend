const httpStatus = require('http-status');
const { Restaurant } = require('../../models/superAdmin');

const all = async () => {
    try {
        const restaurant = await Restaurant.aggregate([
            {
                $lookup: {
                    from: "branches",
                    // localField: "_id",
                    // foreignField: "chapter_id",
                    as: "branches",
                    let: { restaurantId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$$restaurantId', '$restaurantId'] },
                                    ]
                                }
                            }
                        },
                        {
                            $sort: { _id: -1 }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "branchusers",
                    // localField: "_id",
                    // foreignField: "chapter_id",
                    as: "users",
                    let: { status: '$status', restaurantId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$$restaurantId', '$restaurantId'] },
                                    ]
                                }
                            }
                        },
                        {
                            $sort: { _id: -1 }
                        }
                    ]
                }
            },
            {
                $project: {
                    name: "$name",
                    restaurant: "$$ROOT",
                    subStartDate: "$subStartDate",
                    subEndDate: "$subEndDate",
                    branchCount: { $size: "$branches" },
                    userCount: { $size: "$users" }
                }
            },
        ]);
        return ({ status: httpStatus.OK, data: restaurant })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
};

const create = async (data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.logo = file.destination + '/' + file.filename
            })
        } else {
            data.logo = "uploaded/logo/res_logo.png";
        }
        await Restaurant.create({ ...data, database: data.name })
        return ({ status: httpStatus.OK, message: 'Restaurant Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data, files) => {
    try {
        if (files) {
            files.map(file => {
                data.logo = file.destination + '/' + file.filename
            })
        }
        await Restaurant.findByIdAndUpdate(data._id, data);
        return ({ status: httpStatus.OK, message: 'Restaurant Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await Restaurant.findByIdAndDelete(data);
        return ({ status: httpStatus.OK, message: 'Restaurant Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, update, remove
}