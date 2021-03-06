const httpStatus = require('http-status');

const getBranchByResId = async (data) => {
    try {
        let branch = [];
        if (data == 'all') {
            await Promise.all(Object.values(global.restaurants).map(async (key) => {
                const currentBranch = await key.Branch.aggregate([
                    {
                        $lookup: {
                            from: "branchusers",
                            // localField: "_id",
                            // foreignField: "chapter_id",
                            as: "users",
                            let: { branchId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$$branchId', '$branchId'] },
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
                            from: "items",
                            // localField: "_id",
                            // foreignField: "chapter_id",
                            as: "items",
                            let: { status: '$status', branchId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$$branchId', '$branchId'] },
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
                            restaurantId: '$restaurantId',
                            branchName: "$branchName",
                            branchCode: '$branchCode',
                            contactPerson: '$contactPerson',
                            contactNumber: '$contactNumber',
                            status: '$status',
                            userCount: { $size: "$users" },
                            itemCount: { $size: "$items" }
                        }
                    },
                ]);
                branch.push(...currentBranch);
            }))
        } else {
            branch = await global.restaurants[data].Branch.aggregate([
                {
                    $lookup: {
                        from: "branchusers",
                        // localField: "_id",
                        // foreignField: "chapter_id",
                        as: "users",
                        let: { branchId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$$branchId', '$branchId'] },
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
                        from: "items",
                        // localField: "_id",
                        // foreignField: "chapter_id",
                        as: "items",
                        let: { status: '$status', branchId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$$branchId', '$branchId'] },
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
                        restaurantId: '$restaurantId',
                        branchName: "$branchName",
                        branchCode: '$branchCode',
                        contactPerson: '$contactPerson',
                        contactNumber: '$contactNumber',
                        status: '$status',
                        userCount: { $size: "$users" },
                        itemCount: { $size: "$items" }
                    }
                },
            ]);
        }
        return ({ status: httpStatus.OK, data: branch })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {
        await global.restaurants[data.restaurantId].Branch.create(data)
        return ({ status: httpStatus.OK, message: 'Branch Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data) => {
    try {
        await global.restaurants[data.restaurantId].Branch.findByIdAndUpdate(data._id, data)
        return ({ status: httpStatus.OK, message: 'Branch Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await global.restaurants[data.restaurantId].Branch.findByIdAndDelete(data._id);
        return ({ status: httpStatus.OK, message: 'Branch Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    create, getBranchByResId, update, remove
}