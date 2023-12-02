const { ObjectId } = require("mongodb");
const { uploadContentService, updateContentService, deleteContentService, getContentService, createContentService } = require("../service/content.service");
const { isValidObjectId } = require("mongoose");
const httpStatus = require("http-status");


const uploadContent = async (req, res) => {
    try {
        await uploadContentService(req.files);
        res.status(200).send({code: 200, message: "success"});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const createContent = async (req, res) => {
    try {
        await createContentService(req.body);
        res.status(200).send({code: 200, message: "success"});
    } catch (error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const updateContent = async (req, res) => {
    try {
        const {contentId} = req.params;
        if(!isValidObjectId(contentId)) {
            const errorMessage = new Error("Please Provide valid Content Id");
            errorMessage.statusCode = httpStatus.BAD_REQUEST;
            throw errorMessage;
        }
        await updateContentService(contentId,req.body);
        res.status(200).send({code: 200, message: "success"});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const deleteContent = async (req, res) => {
    try {
        const {contentId} = req.params;
        if(!isValidObjectId(contentId)) {
            const errorMessage = new Error("Please Provide valid Content Id");
            errorMessage.statusCode = httpStatus.BAD_REQUEST;
            throw errorMessage;
        }
        await deleteContentService(contentId);
        res.status(204).send({code: 200, message: "success"});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const getContent = async (req, res) => {
    try {
        const type = req?.query?.type;
        const page = {
            limit: req?.query?.limit || 10,
            skip: req?.query?.skip || 0,
        }
        const filter = {
            ...(req?.query?.contentId) && {_id: new ObjectId(req.query.contentId)},  
        }
        const data = await getContentService(filter, type, page);
        res.status(200).send({code: 200, message: "success", result: data});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

module.exports = {
    uploadContent,
    updateContent,
    getContent,
    deleteContent,
    createContent
}