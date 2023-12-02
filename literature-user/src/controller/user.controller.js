const { ObjectId } = require("mongodb");
const { createUserService, updateUserService, deleteUserService, getUserService } = require("../service/user.service");
const { isValidObjectId } = require("mongoose");
const httpStatus = require("http-status");



const createUser = async (req, res) => {
    try {
        await createUserService(req.body);
        res.status(200).send({code: 200, message: "success"});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        if(!isValidObjectId(userId)) {
            const errorMessage = new Error("Please Provide valid User Id");
            errorMessage.statusCode = httpStatus.BAD_REQUEST;
            throw errorMessage;
        } 
        await updateUserService(userId,req.body);
        res.status(200).send({code: 200, message: "success"});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        if(!isValidObjectId(userId)) {
            const errorMessage = new Error("Please Provide valid User Id");
            errorMessage.statusCode = httpStatus.BAD_REQUEST;
            throw errorMessage;
        } 
        await deleteUserService(userId);
        res.status(200).send({code: 200, message: "success"});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const filter = {
            ...(req?.query?.userId) && {_id: new ObjectId(req.query.userId)}
        }
        const data = await getUserService(filter);
        res.status(200).send({code: 200, message: "success", result: data});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteUser,
}