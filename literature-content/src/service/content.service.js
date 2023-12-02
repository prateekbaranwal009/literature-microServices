const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const csvtojson = require('csvtojson');
const csv = require('csv-parser');
const { Readable } = require('stream');
const axios = require("axios");


const contentModel = require("../model/content.model");
const httpStatus = require("http-status");

const insertData = async (data) => {
    await contentModel.create(data);
}

const createContentService = async (body) => {
    if(!body.title || !body.story || !body.date_published || !body.userId) {
      const errorMessage = new Error("Please provide title, story, date_published amd userId");
      errorMessage.statusCode = httpStatus.NOT_ACCEPTABLE;
      throw errorMessage;
    }
    const data = await contentModel.create(body);
    return data;
}

function parseCSV(csvBuffer) {
    return new Promise((resolve, reject) => {
      const results = [];
      const bufferStream = new Readable();
      bufferStream.push(csvBuffer);
      bufferStream.push(null);
  
      bufferStream
        .pipe(csv())
        .on('data', (data) => {
         if(!data.title || !data.story || !data.date_published || !data.userId || !mongoose.isValidObjectId(data.userId)) reject(new Error('Invalid data in CSV'));
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
  
const uploadContentService = async (files) => {
    if(files.file) {
        if (files.file[0].mimetype !== 'text/csv') {
            const errorMessage = new Error("Invalid file format. Please upload a CSV file.");
            errorMessage.statusCode = httpStatus.NOT_ACCEPTABLE;
            throw errorMessage;
          }
        const csvBuffer = files.file[0].buffer;
        const data = await parseCSV(csvBuffer);
        await insertData(data);
    }
}

const updateContentService = async (contentId,body) => {
    const update = {
        ...(body.title) && {title: body.title},
        ...(body.story) && {story: body.story},
    }
    const data = await contentModel.findOneAndUpdate({_id: ObjectId(contentId)},update);
    if(!data) {
      const errorMessage = new Error("Content doesn't exist");
      errorMessage.statusCode = httpStatus.NOT_FOUND;
      throw errorMessage;
    }
    return data;
}

const deleteContentService = async (contentId) => {
    const data = await contentModel.findOneAndDelete({_id: ObjectId(contentId)});
    if(!data) {
      const errorMessage = new Error("Content doesn't exist");
      errorMessage.statusCode = httpStatus.NOT_FOUND;
      throw errorMessage;
    }
    return data;
}

const getTopContent = async () => {
  const url = `http://localhost:3002/v1/getTopContent`;

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
}

const getContentService = async (filter, type, page) => {
    let data = [];
    switch (type) {
        case "single":
            if(!filter?._id) {
              const errorMessage = new Error("Please Provide valid Content Id");
              errorMessage.statusCode = httpStatus.BAD_REQUEST;
              throw errorMessage;
            }
            data = await contentModel.find(filter).lean();
            if(!data.length) {
              const errorMessage = new Error("Content doesn't exist");
              errorMessage.statusCode = httpStatus.NOT_FOUND;
              throw errorMessage;
            }
            break;
        case "new":
            data = await contentModel
              .find(filter)
              .sort({ createdAt: -1 })
              .skip(page.skip)
              .limit(page.limit)
              .lean();
            break;
        case "popular":
            const topContent = await getTopContent();
            const contentId = topContent.map(e => {
                return e.contentId;
            });
            data = await contentModel.find({_id: {$in: contentId}}).lean();
            for (let dataItem of data) {
                const matchingTopContent =  topContent.find(topItem => topItem.contentId === dataItem._id.toString());
                dataItem.likes = matchingTopContent.likes;
                dataItem.read = matchingTopContent.read;
            }
            data.sort((a, b) => (b.likes+b.read) - (a.likes+a.read));

            break;
        default:
            data = await contentModel
              .find(filter)
              .skip(page.skip)
              .limit(page.limit)
              .lean();

            break;
    }
    if(!data.length) {
      const errorMessage = new Error("Content doesn't exist");
      errorMessage.statusCode = httpStatus.NOT_FOUND;
      throw errorMessage;
    }
    return data;
}

module.exports = {
    uploadContentService,
    updateContentService,
    deleteContentService,
    getContentService,
    createContentService
}