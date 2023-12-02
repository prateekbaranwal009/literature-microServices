const { ObjectId } = require("mongodb");
const { createEventService, getTopContentService } = require("../service/event.service");
const { isValidObjectId } = require("mongoose");
const httpStatus = require("http-status");


const createEvent = async (req, res) => {
    try {
        req.body.contentId = req.params.contentId;
        const data = await createEventService(req.body);
        res.status(200).send({code: 200, message: "success", result: data});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

const getTopContent = async (req, res) => {
    try {
        const page = {
            limit: req?.query?.limit || 10,
            skip: req?.query?.skip || 0,
        }
        const data = await getTopContentService(page);
        res.status(200).send({code: 200, message: "success", result: data});
    } catch(error) {
        res
        .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

module.exports = {
    createEvent,
    getTopContent,
}