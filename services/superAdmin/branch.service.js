const httpStatus = require('http-status');
const { Branch } = require('../../models/superAdmin');
const all = async () => {
    try {
        const branch = await Branch.find();
        return ({ status: httpStatus.OK, data: branch })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const getBranchByResId = async (data) => {
    try {
        const branch = data != 'all' ? await Branch.aggregate([
            {
                $match: { restaurantId: ObjectId(data) }
            },
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
                    branchName: "$branchName",
                    userCount: { $size: "$users" },
                    itemCount: { $size: "$items" }
                }
            },
        ]) : await Branch.aggregate([
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
                    branchName: "$branchName",
                    branch: "$$ROOT",
                    userCount: { $size: "$users" },
                    itemCount: { $size: "$items" }
                }
            },
        ])
        return ({ status: httpStatus.OK, data: branch })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {
        await Branch.create(data)
        return ({ status: httpStatus.OK, message: 'Branch Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data) => {
    try {
        await Branch.findByIdAndUpdate(data._id, data)
        return ({ status: httpStatus.OK, message: 'Branch Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await Branch.findByIdAndDelete(data);
        return ({ status: httpStatus.OK, message: 'Branch Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, getBranchByResId, update, remove
}