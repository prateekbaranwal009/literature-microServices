const express = require("express");
const { uploadContent, updateContent, deleteContent, getContent, createContent } = require("../controller/content.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer();

/**
 * @swagger
 * /v1/content/upload:
 *   post:
 *     summary: Upload content file
 *     description: Upload a csv file that have title, story, date_published, and userId.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         type: file
 *         required: true
 *         description: The content file to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *       406:
 *         description: Invalid file format. Please upload a CSV file.
 *       500:
 *         description: Internal server error.
 */
router
    .route("/content/upload")
    .post(upload.fields([
        { name: 'file', maxCount: 1 }, 
    ]),
    uploadContent)

/**
 * @swagger
 * /v1/content/update/{contentId}:
 *   patch:
 *     summary: Update content by ID
 *     description: Update content by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: contentId
 *         description: The ID of the content to update.
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               story:
 *                 type: string
 *                 description: The updated content story.
 *               title:
 *                 type: string
 *                 description: The updated content title.
 *     responses:
 *       200:
 *         description: Content updated successfully.
 *       404:
 *         description: Content not found.
 *       400:
 *         description: Bad request, invalid input.
 *       500:
 *         description: Internal server error.
 */
router
    .route("/content/update/:contentId")
    .patch(updateContent)

/**
 * @swagger
 * /v1/content/delete/{contentId}:
 *   delete:
 *     summary: Delete content by ID
 *     description: Delete content by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: contentId
 *         description: The ID of the content to delete.
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Content deleted successfully.
 *       404:
 *         description: Content not found.
 *       500:
 *         description: Internal server error.
 */
router
    .route("/content/delete/:contentId")
    .delete(deleteContent)

/**
 * @swagger
 * /v1/content/get:
 *   get:
 *     summary: Get content
 *     description: Retrieve content based on the provided type.
 *     parameters:
 *       - in: query
 *         name: type
 *         description: The type of content to retrieve (e.g., "single," "new," "popular," "all").
 *         required: true
 *         type: string
 *         enum: ["single", "new", "popular", "all"]
 *       - in: query
 *         name: contentId
 *         description: The ID of the content to retrieve (required for "single" type).
 *         required: false
 *         type: string
  *       - in: query
 *         name: limit
 *         description: Number of content to get
 *         required: false
 *         type: number
  *       - in: query
 *         name: skip
 *         description: Number of content to skip
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: A list of content items or a single content item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       story:
 *                         type: string
 *                       date_published:
 *                         type: string
 *                         format: date-time
 *                       userId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       likes:
 *                         type: integer
 *                       read:
 *                         type: integer
 *               example:
 *                 code: 200
 *                 message: success
 *                 result:
 *                   - _id: "6534b9133a6d3e24c083f5ed"
 *                     title: "title 1"
 *                     story: "story 1"
 *                     date_published: "2023-10-11T06:30:00.000Z"
 *                     userId: "5f647a1c8d2fdd1dd1cded5b"
 *                     createdAt: "2023-10-22T05:54:27.167Z"
 *                     updatedAt: "2023-10-22T05:54:27.167Z"
 *                     likes: 5
 *                     read: 0
 *                   - _id: "653420de5f75cdb08b41971b"
 *                     title: "Sample Title 4"
 *                     story: "This is the fourth story."
 *                     date_published: "2023-09-04T13:00:00.000Z"
 *                     userId: "5f647a1c8d2fdd1dd1cded5d"
 *                     createdAt: "2023-10-21T19:05:02.140Z"
 *                     updatedAt: "2023-10-21T19:05:02.140Z"
 *                     likes: 2
 *                     read: 2
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       500:
 *         description: Internal server error.
 */
router
    .route("/content/get")
    .get(getContent)

/**
 * @swagger
 * /v1/content/create:
 *   post:
 *     summary: Create new content
 *     description: Create a new content item.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: content
 *         description: The content data to create.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             story:
 *               type: string
 *             date_published:
 *               type: string
 *               format: date-time
 *             userId:
 *               type: objectId
 *         example:
 *           title: "title 2"
 *           story: "story 2"
 *           date_published: "2023-10-11T12:00:00Z"
 *           userId: "5f647a1c8d2fdd1dd1cded5b"
 *     responses:
 *       201:
 *         description: Content created successfully.
 *       406:
 *         description: Invalid file format. Please upload a CSV file.
 *       500:
 *         description: Internal server error.
 */
router 
    .route("/content/create")
    .post(createContent)
    
module.exports = router;