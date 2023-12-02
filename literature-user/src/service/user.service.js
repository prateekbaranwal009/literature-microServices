const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const userModel = require("../model/user.model");
const httpStatus = require("http-status");

const createUserService = async (body) => {
    const data = await userModel.create(body);
    return data;
}

const updateUserService = async (userId,body) => {
    const update = {
        ...(body.firstName) && {firstName: body.firstName},
        ...(body.mobile) && {mobile: body.mobile},
        ...(body.lastName) && {lastName: body.lastName},
        ...(body.email) && {email: body.email}
    }
    const data = await userModel.findOneAndUpdate({_id: ObjectId(userId)},update);
    if(!data.length) {
        const errorMessage = new Error("User doesn't exist");
        errorMessage.statusCode = httpStatus.NOT_FOUND;
        throw errorMessage;
    }
    return data;
}

const deleteUserService = async (userId) => {
    const data = await userModel.findOneAndDelete({_id: ObjectId(userId)});
    if(!data.length) {
        const errorMessage = new Error("User doesn't exist");
        errorMessage.statusCode = httpStatus.NOT_FOUND;
        throw errorMessage;
    }
    return data;
}

const getUserService = async (filter) => {
    const data = await userModel.find(filter);
    if(!data.length) {
        const errorMessage = new Error("User doesn't exist");
        errorMessage.statusCode = httpStatus.NOT_FOUND;
        throw errorMessage;
    }
    return data;
}

module.exports = {
    createUserService,
    updateUserService,
    deleteUserService,
    getUserService,
}