const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const axios = require("axios");

const eventModel = require("../model/event.model");
const userEventModel = require("../model/userEvent.model");
const httpStatus = require("http-status");

const getContent = async (contentId) => {
  const url = `http://localhost:3001/v1/content/get?type=single&contentId=${contentId}`;

  let result = [];
  await axios
    .get(url)
    .then((response) => {
      result = response?.data?.result
    })
    .catch((error) => {
      const errorMessage = new Error(`content service error ${error?.response?.data?.message || error?.message}`);
      errorMessage.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      throw errorMessage;
    });
  return result;
};

const getUser = async (userId) => {
  const url = `http://localhost:3000/v1/user/get?userId=${userId}`;
  let result = [];
  await axios
    .get(url)
    .then((response) => {
      result = response?.data?.result
    })
    .catch((error) => {
        const errorMessage = new Error(`user service error ${error?.response?.data?.message || error?.message}`);
        errorMessage.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        throw errorMessage;
    });
  return result;
}

const createEventService = async (body) => {
  let { contentId, userId, like, read } = body;
  like = like || 0;
  read = read || 0;
  if(!mongoose.isValidObjectId(contentId)) {
    const errorMessage = new Error("Please Provide valid Content Id");
    errorMessage.statusCode = httpStatus.BAD_REQUEST;
    throw errorMessage;
  }
  const [content, user] = await Promise.all([
    getContent(contentId),
    getUser(userId)
  ]);
  if(!content.length) {
    const errorMessage = new Error("Content doesn't exist");
    errorMessage.statusCode = httpStatus.NOT_FOUND;
    throw errorMessage;
  }
  if(!user.length) {
    const errorMessage = new Error("User doesn't exist");
    errorMessage.statusCode = httpStatus.NOT_FOUND;
    throw errorMessage;
  }
  const [events, userEvent] = await Promise.all([
    eventModel.findOneAndUpdate({contentId: new ObjectId(contentId)},{$inc: {likes:like, read: read}},{new: true, upsert: true}),
    userEventModel.create(body)
  ])
  return events;
};

const getTopContentService = async (page) => {
    const data = await eventModel.aggregate([
        {
          $addFields: {
            interaction: {
              $add: ["$likes", "$read"],
            },
          },
        },
        {
          $sort: {
            interaction: -1,
          },
        },
        {
            $skip: page.skip
        },
        {
            $limit: page.limit
        }
      ]);
    return data;
}

module.exports = {
    createEventService,
    getTopContentService
};
