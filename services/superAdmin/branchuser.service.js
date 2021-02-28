const httpStatus = require('http-status');
const { BranchUser, Branch } = require('../../models/superAdmin');
const bcrypt = require("bcryptjs");
const User = require('../../models/user.model');
const all = async (resId, branchId) => {
    try {
        const data = { ...(resId != 'all' && { restaurantId: ObjectId(resId) }), ...(branchId != 'all' && { branchId: ObjectId(branchId) }) }
        const users = await BranchUser.aggregate([{
            $match: data
        },
        {
            $lookup: {
                from: "restaurants",
                localField: "restaurantId",
                foreignField: "_id",
                as: "restaurantdata",
            }
        },
        {
            $unwind: '$restaurantdata'
        },
        {
            $project: {
                branchUser: '$$ROOT',
                userName: "$userName",
                userRole: "$userRole",
                restaurantId: '$restaurantId',
                userMobile: "$userMobile",
                restaurantName: "$restaurantdata.name",
            }
        }
        ]);
        const userdata = await Promise.all(users.map(async (item) => {

            if (item.restaurantId) {
                let branch = await Branch.findById(item.branchId)
                item.branchName = branch ? branch.branchName : undefined;
                item.associatedWith = branch ? `${item.restaurantName} (${branch.branchName})` : item.restaurantName
            }


            return { ...item }
        }))
        return ({ status: httpStatus.OK, data: userdata })
    } catch (error) {
        console.log(error);
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const create = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        await User.create({ name: data.userName, mobile: data.userMobile, password: hashPassword, role: data.role })
        await BranchUser.create({ ...data, userRole: data.role })
        return ({ status: httpStatus.OK, message: 'User Added Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const update = async (data) => {
    try {
        await BranchUser.findByIdAndUpdate(data._id, data)
        return ({ status: httpStatus.OK, message: 'User Updated Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

const remove = async (data) => {
    try {
        await BranchUser.findByIdAndDelete(data);
        return ({ status: httpStatus.OK, message: 'User Deleted Successfully' })
    } catch (error) {
        return ({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error })
    }
}

module.exports = {
    all, create, update, remove
}